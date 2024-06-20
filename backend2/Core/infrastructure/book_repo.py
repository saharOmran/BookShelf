from pymongo import MongoClient

from bson import ObjectId

class BookRepository:
    def __init__(self, db: MongoClient):
        self.collection = db["books"]

    def save_book(self, book_data):
        return self.collection.insert_one(book_data)
    
    def get_book_by_id(self, book_id):
        return self.collection.find_one({"_id": ObjectId(book_id)})
    
    
