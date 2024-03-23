from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, Float, String, MetaData, Table
from sqlalchemy.orm import sessionmaker
from pathlib import Path
import yfinance as yf
from pydantic import BaseModel, validator
import math

# Database connection URL (replace with yours)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a metadata object (not strictly necessary, but good practice)
metadata = MetaData()

# Define a table representing the existing schema (**no table creation here**)
table = Table(
    "stocks",  # Assuming the table name is 'stocks' (modify if different)
    metadata,
    Column("ticker", String, primary_key=True),
    Column("amount", Float),
    Column("status", String),
    Column("email", String),
    Column("company", String),
    Column("sector", String),
    Column("industry", String),
    Column("country", String),
    Column("market", Float),
    Column("pe", Float),
    Column("price", Float),
    Column("change", String),
    Column("volume", Integer),
)

# Create a sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

# Configure CORS middleware
origins = [
    "http://localhost:3000",  # Replace with the URL of your Next.js frontend
    # Add other allowed origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockData(BaseModel):
    Symbol: str
    Company: str
    Industry: str
    Sector: str
    Market: str
    PE: float | None
    Price: float | None
    Quantity: int
    Invested: float | None
    Weight: float

    @validator("*", pre=True)
    def convert_nan_to_none(cls, v):
        if isinstance(v, float) and math.isnan(v):
            return None
        return v

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Stock API"}

@app.get("/stocks/")
async def get_stocks():
    try:
        # Create a new session
        db = SessionLocal()
        # Execute a select query to fetch all stocks
        query = table.select()
        result = db.execute(query).fetchall()
        # Get all column names from the table (assuming you know the table name)
        all_columns = [column.name for column in table.columns]
        # Convert the result to a list of dictionaries with all columns
        stocks = [dict(zip(all_columns, row)) for row in result]
        return {"stocks": stocks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/yfinance")
async def get_yfinance_stocks():
    try:
        # Define the stock symbols
        symbols = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
                   "HDFC.NS", "HINDUNILVR.NS", "SBIN.NS", "BAJFINANCE.NS", "BHARTIARTL.NS"]
        
        # Fetch stock data using yfinance
        stock_data = yf.download(symbols, group_by="ticker", threads=True)
        
        # Process the stock data
        processed_data = []
        for symbol in symbols:
            stock = stock_data[symbol]
            latest_data = stock.iloc[-1]
            
            stock_info = StockData(
                Symbol=symbol,
                Company=symbol.split(".")[0],
                Industry="",  # Add industry information if available
                Sector="",  # Add sector information if available
                Market="NSE",
                PE=latest_data["PE"] if "PE" in latest_data and not math.isnan(latest_data["PE"]) else None,
                Price=latest_data["Close"] if not math.isnan(latest_data["Close"]) else None,
                Quantity=1,  # Set a default quantity or fetch from your database
                Invested=latest_data["Close"] if not math.isnan(latest_data["Close"]) else None,
                Weight=0.0  # Set a default weight or calculate based on your criteria
            )
            processed_data.append(stock_info)
        
        return processed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)