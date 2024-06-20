from pydantic import BaseModel

class CartItem(BaseModel):
    book_id: str
    quantity: int
