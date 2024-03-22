from fastapi import Body, FastAPI
from mangum import Mangum

app = FastAPI()

BOOKS = [
    {'id': 1, 'title': 'Title One', 'author': 'James', 'category': 'science'},
    {'id': 2,'title': 'Title Two', 'author': 'Cristian', 'category': 'science'},
    {'id': 3,'title': 'Title Three', 'author': 'smith', 'category': 'history'},
    {'id': 4,'title': 'Title Four', 'author': 'steroid', 'category': 'math'}
]

@app.get("/")
async def first_api():
    return {"message": "Hello World"}

@app.get("/books")
async def read_books():
    return BOOKS

@app.get("/books/{book_title}")
async def read_book_by_title(book_title: str):
    for book in BOOKS:
        if book.get('title').casefold() == book_title.casefold():
            return book
    return {"message": "Book not found"}

@app.get("/books/{book_title}")
async def read_book_by_title_and_category(book_title: str, category: str):
    books_to_return = []
    for book in BOOKS:
        if book.get('title').casefold() == book_title.casefold() and book.get('category').casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return

@app.put('/books/update')
async def update_book(updated_book=Body(...)):
    for i in range(len(BOOKS)):
        if BOOKS[i].get('title').casefold() == updated_book.get('title').casefold():
            BOOKS[i] = updated_book
            return {"message": "Book updated"}
    return {"message": "Book not found"}

@app.delete('/books/delete/{id}')
async def delete_book(id: int):
    for i in range(len(BOOKS)):
        if BOOKS[i].get('id') == id:
            BOOKS.pop(i)
            return {'message': f'Book {id} deleted'}
    return {"message": "Book not found"}

handler = Mangum(app)
