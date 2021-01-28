import folium
from folium.plugins import HeatMap
import pandas as pd
import requests
import os.path

def heatmap(theurl):
    save_path = "templates/"
    fname = theurl
    data = requests.get(theurl).json()
    lst1=[]
    lst2=[]
    for i in range(len(data['features'])):
        lst1.append(data['features'][i]['geometry']['coordinates'])
        lst2.append(data['features'][i]['properties']['count'])
    df = pd.DataFrame(lst1,columns = ['longitude', 'latitude'])
    df['count']=lst2
    max_count = float(df['count'].max())
    hmap = folium.Map(location=[34.2012,18.4662], zoom_start=2, )
    hm_wide = HeatMap( list(zip(df['latitude'], df['longitude'], df['count'])), min_opacity=0.5, radius=17, blur=15, max_zoom=1)
    hmap.add_child(hm_wide)
    hmap.save(save_path+'heatmap.html')

# def pointmap(theurl):
#     save_path = "templates/"
#     fname = theurl
#     gdf = gpd.read_file(fname)
#     gdf['longitude'] = gdf['geometry'].x
#     gdf['latitude'] = gdf['geometry'].y
#     max_count = float(gdf['count'].max())
#     m=folium.Map([34.2012,18.4662],zoom_start=2.49)
#     for latitude, longitude, count in zip(gdf['latitude'],gdf['longitude'],gdf['count']):
#         folium.CircleMarker([latitude, longitude] , radius=count//250 , color='#2982ff', fill=True , fill_opacity=0.5).add_to(m)
#     m.save(save_path+'pointmap.html')