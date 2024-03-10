
from pydantic import BaseModel
from typing import ClassVar
from datetime import datetime
from typing import List
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: str
    password: str


class UserDisplay(BaseModel):
    username: str
    email: str

    class Config:
        from_orm = True




# user in post display and comment display
class User(BaseModel):
    username: str
    email : str

    class Config:
        from_attributes = True



class BookBase(BaseModel):

    title : str
    category_id : int
    author_id: int
    publisher : str
    price : int
    published : int
    description : str
    image_url: str



class BookDisplay(BaseModel):
    id : int
    title: str
    category_id: int
    author_id: int
    publisher: str
    price: int
    published: int
    description: str
    image_url: str


class Config:
        from_orm = True




class UserAuth(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class CartItemsDisplay(BaseModel):
    cart_id : str
    book_id: str
    quantity: int
    item_price: int
    book_image : Optional[str]

    class Config:
        from_attributes = True



class CartDisplay(BaseModel):
    total_price: float

    class Config:
        from_attributes = True



class CategoryBase(BaseModel):
    name : str


class CategoryDisplay(BaseModel):
    id : int
    name : str

    class Config:
        from_attributes = True



class AuthorBase(BaseModel):
    name : str


class AuthorDisplay(BaseModel):
    id : int
    name : str

    class Config:
        from_attributes = True





class UpdateUserBase(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]


class paymentBase(BaseModel):
    address : str

