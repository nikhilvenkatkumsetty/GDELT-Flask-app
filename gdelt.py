import json
import requests
from datetime import datetime
import pandas as pd

# "https://api.gdeltproject.org/api/v2/context/context?&mode=artlist&&searchlang=english&format=json"


def grabError(theurl):
    data = requests.get(theurl)
    try:
        json_object = data.json()
        stat = "ok"
        # print(json_object)
        return json_object, stat
    except ValueError:
        text_object = data.text
        stat = "not ok"
        # print(text_object)
        return text_object, stat


def get_formatted_news(required_news):
    custom_news = []
    titles = []
    for news in required_news:
        if news['title'].lower() not in titles:
            temp = {
                "title": news["title"],
                "url": news["url"],
                "dt": news["seendate"],
                "domain": news["domain"]
            }
            custom_news.append(temp)
            titles.append(news["title"].lower())
    curr_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    curr_time = datetime.strptime(curr_time, "%Y-%m-%d %H:%M:%S")
    for news in custom_news:
        news["dt"] = datetime.strptime(
            news["dt"], "%Y%m%dT%H%M%SZ")
        diff = curr_time - news["dt"]
        days, seconds = diff.days, diff.seconds
        hours = days * 24 + seconds // 3600
        minutes = (seconds % 3600) // 60
        news["dt"] = {
            "hours": hours,
            "minutes": minutes,
        }
    return custom_news


def get_tonechart_data(theurl):
    data = requests.get(theurl).json()
    df = pd.DataFrame(data["tonechart"])
    df.drop("toparts", axis=1, inplace=True)

    def catagorize(x):
        if x > 4:
            return "Very Positive"
        elif x < -4:
            return "Very Negative"
        elif x > 0:
            return "Positive"
        elif x == 0:
            return "Neutral"
        else:
            return "Negative"
    df["new_bin"] = df["bin"].apply(catagorize)
    total_count = {
        "Very Negative": 0,
        "Negative": 0,
        "Neutral": 0,
        "Positive": 0,
        "Very Positive": 0
    }
    for cat in total_count.keys():
        for ind in df.index:
            if df["new_bin"][ind] == cat:
                total_count[cat] = total_count[cat] + \
                    df["count"][ind]
    total = sum(total_count.values())
    for key in total_count:
        total_count[key] = round((total_count[key]/total)*100, 1)

    labels = list(total_count.keys())
    values = list(total_count.values())
    return labels, values, total


def get_geo_url(theurl):
    geo_data = requests.get(theurl)
    return geo_data.url


def get_line_data(theurl):
    line_data = requests.get(theurl).json()
    date_labels = []
    for d in range(len(line_data["timeline"][0]['data'])):
        date_labels.append(line_data["timeline"][0]['data'][d]['date'])
    date_labels = list(map(lambda x: str(datetime.strptime(
        x, "%Y%m%dT%H%M%SZ").strftime("%d-%b")), date_labels))
    date_values = []
    for d in range(len(line_data["timeline"][0]['data'])):
        date_values.append(line_data["timeline"][0]['data'][d]['value'])
    title = line_data['query_details']['title']
    return date_labels, date_values, title

