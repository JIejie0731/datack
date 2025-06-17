import requests
import time
import json

key = 'bfbb8b26ad280c106307cfbf325545de'
city = '深圳'
keywords = '小米之家'
page = 1
all_shops = []

while True:
    url = (
        f'https://restapi.amap.com/v3/place/text?key={key}'
        f'&keywords={keywords}&city={city}&output=JSON&offset=50&page={page}'
    )
    resp = requests.get(url)
    data = resp.json()
    print(f'第{page}页返回：', data)  # 调试输出
    pois = data.get('pois', [])
    if not pois:
        break

    for poi in pois:
        name = poi.get('name', '')
        address = poi.get('address', '')
        tel = poi.get('tel', '')
        location = poi.get('location', '')  # "经度,纬度"
        pname = poi.get('pname', '')        # 省
        cityname = poi.get('cityname', '')  # 市
        adname = poi.get('adname', '')      # 区
        if location:
            lng, lat = location.split(',')
        else:
            lng, lat = '', ''
        all_shops.append({
            'store_name': name,
            'address': address,
            'tel': tel,
            'province': pname,
            'city': cityname,
            'district': adname,
            'full_region': f'{cityname} {adname}',
            'position': {
                'lat': lat,
                'lng': lng
            }
        })
    print(f'已抓取第{page}页，共{len(all_shops)}家门店')
    if len(pois) < 50:
        break
    page += 1
    time.sleep(0.5)  # 防止请求过快被限流

# 保存为JSON文件
with open('xiaomi_shops_sz.json', 'w', encoding='utf-8') as f:
    json.dump(all_shops, f, ensure_ascii=False, indent=2)

print('全部门店信息已保存到 xiaomi_shops_sz.json')