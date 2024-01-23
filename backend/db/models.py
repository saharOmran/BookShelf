from db.database import Base
from sqlalchemy import Column, Integer,Float,String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

#user table
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, index=True, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    is_admin = Column(Boolean)
    user_cart_id = Column(Integer, ForeignKey('cart.id'))
  #  user_favorite = Column(Integer, ForeignKey('favorite.id'))


#Book table
class Book(Base):
    __tablename__ = 'book'
    id = Column(Integer, index=True, primary_key=True)
    title = Column(String)
    category_id = Column(Integer, ForeignKey('category.id'))
    author_id = Column(Integer, ForeignKey('author.id'))
    publisher = Column(String)
    price = Column(Integer)
    published = Column(Integer)
    description = Column(String)
    image_url = Column(Integer, ForeignKey('picture.url'))




#category table
class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, index=True, primary_key=True)
    name = Column(String)




#author table
class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, index=True, primary_key=True)
    name = Column(String)




#payment table
class Payment(Base):
    __tablename__ = 'payment'
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey('cart.id'))
    payment_check = Column(Boolean)


#cart table
class Cart(Base):
    __tablename__ = 'cart'
    id = Column(Integer, index=True, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    total_price = Column(Float)
    payment_id = Column(Integer, ForeignKey('payment.id'))


#cart item table
class CartItem(Base):
    __tablename__ = 'cart_item'
    id = Column(Integer, index=True, primary_key=True)
    cart_id = Column(Integer, ForeignKey('cart.id'))
    book_id = Column(Integer, ForeignKey('book.id'))
    quantity = Column(Integer)
    item_price = Column(Integer)
    book_image = Column(String, ForeignKey('book.image_url'))



class Picture(Base):
     __tablename__ = 'picture'
     id = Column(Integer, index=True, primary_key=True)
     url = Column(String)
