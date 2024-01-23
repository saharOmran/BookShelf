from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from db.models import Base
from db.database import engine
from routers import user, book, cart, payment, picture
from admin_router import book_admin, author_admin, category_admin
from authentication import authentications
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(user.router)
app.include_router(book.router)
app.include_router(cart.router)
app.include_router(category_admin.router)
app.include_router(author_admin.router)
app.include_router(book_admin.router)
app.include_router(authentications.router)
app.include_router(payment.router)
app.include_router(picture.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.mount('/pictures', StaticFiles(directory='pictures'), name = 'pictures')


Base.metadata.create_all(engine)


@app.get("/")
def home():
    return "Hello"
