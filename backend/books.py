
from fastapi import FastAPI

app = FastAPI()

BOOKS = [
    {'title': 'Title One', 'author': 'James', 'category': 'science'},
    {'title': 'Title Two', 'author': 'Cristian', 'category': 'science'},
    {'title': 'Title Three', 'author': 'smith', 'category': 'history'},
    {'title': 'Title Four', 'author': 'steroid', 'category': 'math'}
]

@app.get("/")
async def first_api():
    return {"message": "Hello World"}

@app.get("/books")
async def read_book():
    return BOOKS

@app.get("/books/{book_title}")
async def read_book(book_title: str):
    for book in BOOKS:
        if book.get('title').casefold() == book_title.casefold():
            return book

