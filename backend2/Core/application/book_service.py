from bson import ObjectId

class BookService:
    def __init__(self, db):
        self.db = db
        self.collection = db["books"]

    def add_book(self, book_data):
        inserted_book = self.collection.insert_one(book_data)
        return str(inserted_book.inserted_id), f"/books/{str(inserted_book.inserted_id)}"
    
    def get_book_by_id(self, book_id):
        return self.collection.find_one({"_id": ObjectId(book_id)})

    def get_all_books(self):
        return list(self.collection.find())

    def get_books_by_title(self, title):
        return list(self.collection.find({"name": {"$regex": title, "$options": "i"}}))

    def get_books_by_author(self, author):
        return list(self.collection.find({"writers_name": {"$regex": author, "$options": "i"}}))

    def get_books_by_category(self, category):
        return list(self.collection.find({"category": {"$regex": category, "$options": "i"}}))
    
    def delete_book(self, book_id):
        result = self.collection.delete_one({"_id": ObjectId(book_id)})
        return result.deleted_count == 1
        
    def update_book(self, book_id, updated_data):
        result = self.collection.update_one({"_id": ObjectId(book_id)}, {"$set": updated_data})
        return result.modified_count == 1
