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
    
    def delete_book(self, book_id):
        result = self.collection.delete_one({"_id": ObjectId(book_id)})
        if result.deleted_count == 1:
            return True
        else:
            return False
        
    def update_book(self, book_id, updated_data):
        result = self.collection.update_one({"_id": ObjectId(book_id)}, {"$set": updated_data})
        if result.modified_count == 1:
            return True
        else:
            return False
