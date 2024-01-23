import datetime
from db.models import Book, Author, Category, User
from schemas import BookBase
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status


def get_book(id: int, db: Session):
    book = db.query(Book).filter(Book.id == id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='book not found.')
    return book


def get_all_books(db: Session):
    return db.query(Book).all()


def get_book_by_title(title: str, db: Session):
    book = db.query(Book).filter(Book.title == title).all()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='book not found.')
    return book



def get_book_by_author(author_name: str, db: Session):
    author = db.query(Author).filter(Author.name == author_name).first()
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No such a Author was found !')

    books = db.query(Book).filter(Book.author_id == author.id).all()

    if not books:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No book was found in this category!')

    return books


def get_book_by_category(category_name: str, db: Session):
    category = db.query(Category).filter(Category.name == category_name).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No such a category was found !')

    books = db.query(Book).filter(Book.category_id == category.id).all()

    if not books:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No book was found in this category!')

    return books


#admin
def add_book(request: BookBase, db :Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    new_book = Book(
        title = request.title,
        category_id = request.category_id,
        author_id = request.author_id,
        publisher=request.publisher,
        price = request.price,
        published = request.published,
        description = request.description,
        image_url= request.image_url,
    )
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book



def delete_book(id: int, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    try:
        book = db.query(Book).filter(Book.id == id).first()
        if not book:
            return "No such a book"

        db.delete(book)
        db.commit()

        return 'Book deleted'

    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)



def get_book_by_admin(id: int, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    book = db.query(Book).filter(Book.id == id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='book not found.')
    return book


def get_all_books_by_admin(db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return db.query(Book).all()


def get_book_by_title_admin(title: str, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    book = db.query(Book).filter(Book.title == title).all()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='book not found.')
    return book



def get_book_by_author_admin(author_name: str, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    author = db.query(Author).filter(Author.name == author_name).first()
    if not author:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No such a Author was found !')

    books = db.query(Book).filter(Book.author_id == author.id).all()

    if not books:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No book was found in this category!')

    return books


def get_book_by_category_admin(category_name: str, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    category = db.query(Category).filter(Category.name == category_name).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No such a category was found !')

    books = db.query(Book).filter(Book.category_id == category.id).all()

    if not books:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No book was found in this category!')

    return books



def edite_book(id: int, request: BookBase, db: Session, admin_id: int):
    user = db.query(User).filter(User.id == admin_id).first()
    if user.is_admin == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    try:
        book = db.query(Book).filter(Book.id == id).first()

        book.title = request.title
        book.category_id = request.category_id
        book.author_id = request.author_id
        book.published = request.published
        book.publisher = request.publisher
        book.price = request.price
        book.description = request.description
        book.image_url = request.image_url

        db.commit()
        db.refresh(book)

        return book

    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)




