from pydantic import BaseModel

class Book(BaseModel):
    name: str
    category: str
    writers_name: str
    publisher_name: str
    price: float
    year_of_publication: int
    explanation: str
    image_url: str
    book_number: str
