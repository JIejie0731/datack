import requests
import json

key = 'bfbb8b26ad280c106307cfbf325545de'  # 你的高德key
url = f'https://restapi.amap.com/v3/config/district?key={key}&keywords=深圳市&subdistrict=2&extensions=all&output=JSON'

resp = requests.get(url)
data = resp.json()

# 打印API返回内容，便于排查
print(json.dumps(data, ensure_ascii=False, indent=2))