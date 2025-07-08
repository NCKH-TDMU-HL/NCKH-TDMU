from pymongo import MongoClient
from urllib.parse import quote
import requests
import time

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "Class1"
COLLECTION_NAME = "multiplechoices"
PIXABAY_API_KEY = "51127855-9b315e1d97d8e1f4c5170ec76"
DEFAULT_IMAGE = "https://via.placeholder.com/150?text=Option"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

image_cache = {}

def get_image_url(keyword):
    if keyword in image_cache:
        return image_cache[keyword]
    print(f"🔍 Đang tìm ảnh cho: {keyword}")
    keyword_encoded = quote(keyword)
    url = f"https://pixabay.com/api/?key={PIXABAY_API_KEY}&q={keyword_encoded}&image_type=illustration&per_page=3"
    
    try:
        res = requests.get(url)
        data = res.json()
        hits = data.get("hits", [])
        image_url = hits[0].get("previewURL", DEFAULT_IMAGE) if hits else DEFAULT_IMAGE
    except Exception as e:
        print(f"❌ Lỗi lấy ảnh cho '{keyword}': {e}")
        image_url = DEFAULT_IMAGE

    image_cache[keyword] = image_url
    time.sleep(0.3)
    return image_url

# Quét các document cần cập nhật
documents = list(collection.find({}))

for doc in documents:
    options = doc.get("options", [])

    if options and all(isinstance(opt, str) for opt in options):
        updated_options = []
        for opt in options:
            image_url = get_image_url(opt)
            updated_options.append({
                "text": opt,
                "image": image_url
            })

        result = collection.update_one(
            {"_id": doc["_id"]},
            {"$set": {"options": updated_options}}
        )

        print(f"✅ Đã cập nhật: {doc.get('question')} ({result.modified_count} mục)")

print("🎉 Hoàn tất cập nhật.")
