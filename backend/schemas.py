# schemas.py

from pydantic import BaseModel

class StockCreate(BaseModel):
    ticker: str
    amount: float
    status: str
    email: str
    company: str
    sector: str
    industry: str
    country: str
    market: float
    pe: float
    price: float
    change: str
    volume: float
