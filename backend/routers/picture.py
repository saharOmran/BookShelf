from fastapi import APIRouter, File, UploadFile, Depends
import shutil
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Book



router = APIRouter(prefix='/picture', tags=['picture'])



@router.post('/uploadpicture')
def get_upload_file(book_id : int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    name = file.filename
    type = file.content_type
    path = f'pictures/{book_id}'
    book.image_url = path
    db.commit()

    with open(path, 'w+b') as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        'path' : path,
        'type' : type
    }


@router.post('/download/{book_id}', response_class=FileResponse)
def download_picture(book_id : int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    path = f'pictures/{book_id}'
    return path

