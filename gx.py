import json

with open('frontend/public/shenzhen_streets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

features = data['features']
new_features = []
for feat in features:
    if feat['properties']['name'] == '龙岗区':
        # 找到龙岗区
        polygons = feat['geometry']['coordinates']
        # 计算每个多边形的经度均值
        poly_lng_mean = []
        for poly in polygons:
            # poly: [[[lng, lat], ...]]
            all_lng = [pt[0] for ring in poly for pt in ring]
            mean_lng = sum(all_lng) / len(all_lng)
            poly_lng_mean.append(mean_lng)
        # 找到经度均值最大的多边形（大鹏新区）
        idx = poly_lng_mean.index(max(poly_lng_mean))
        dapeng_poly = [polygons[idx]]
        longgang_polys = polygons[:idx] + polygons[idx+1:]
        # 新建大鹏新区Feature
        dapeng_feat = {
            "type": "Feature",
            "properties": {**feat['properties'], "name": "大鹏新区"},
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": dapeng_poly
            }
        }
        # 修改龙岗区Feature
        feat['geometry']['coordinates'] = longgang_polys
        new_features.append(feat)
        new_features.append(dapeng_feat)
    else:
        new_features.append(feat)

data['features'] = new_features

with open('frontend/public/shenzhen_streets_modified.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('已生成 frontend/public/shenzhen_streets_modified.json')