from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_category
from typing import List
from authentication import auth
from fastapi.exceptions import HTTPException
from schemas import CategoryBase, CategoryDisplay, UserAuth



router = APIRouter(prefix='/category', tags=['category'])


@router.post('/add_category', response_model=CategoryDisplay)
def add_category(request: CategoryBase, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin) ):
    return db_category.add_category(request, db)

