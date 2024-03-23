from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, Float, String, MetaData, Table
from sqlalchemy.orm import sessionmaker
from pathlib import Path
import yfinance as yf
from pydantic import BaseModel, validator
import math
import logging

# Database connection URL (replace with yours)
SQLALCHEMY_DATABASE_URL = "sqlite:///./stocks.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a metadata object (not strictly necessary, but good practice)
metadata = MetaData()

# Define a table representing the existing schema (**no table creation here**)
table = Table(
    "stocks",
    metadata,
    Column("Symbol", String, primary_key=True),
    Column("Company", String),
    Column("Industry", String),
    Column("Sector", String),
    Column("Market", String),
    Column("PE", Float),
    Column("EPS", Float),
    Column("MarketCap", Float),
    Column("BookValue", Float),
    Column("DividendYield", Float),
    Column("EBITDA", Float),
    Column("PriceToSalesTrailing12Months", Float),
    Column("FiftyTwoWeekHigh", Float),
    Column("FiftyTwoWeekLow", Float),
    Column("FiftyDayMovingAverage", Float),
    Column("TwoHundredDayMovingAverage", Float),
    Column("SharesOutstanding", Float),
    Column("Price", Float),
    Column("Quantity", Integer),
    Column("Invested", Float),
    Column("Weight", Float),
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
    PE: float | None = None
    EPS: float | None = None
    MarketCap: float | None = None
    BookValue: float | None = None
    DividendYield: float | None = None
    EBITDA: float | None = None
    PriceToSalesTrailing12Months: float | None = None
    FiftyTwoWeekHigh: float | None = None
    FiftyTwoWeekLow: float | None = None
    FiftyDayMovingAverage: float | None = None
    TwoHundredDayMovingAverage: float | None = None
    SharesOutstanding: float | None = None
    Price: float | None = None
    Quantity: int
    Invested: float | None = None
    Weight: float

    @validator("*", pre=True)
    def convert_nan_to_none(cls, v):
        if isinstance(v, float) and math.isnan(v):
            return None
        return v

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

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
        # Define a list of NSE company symbols
        nse_companies = [    "RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "HDFC", "HINDUNILVR",    "SBIN", "BAJFINANCE", "BHARTIARTL", "KOTAKBANK", "AXISBANK", "LT",    "ITC", "HCLTECH", "MARUTI", "ASIANPAINT", "TITAN", "SUNPHARMA", "NESTLEIND",    "INDUSINDBK", "ONGC", "DMART", "BAJAJFINSV", "ULTRACEMCO", "BPCL", "CIPLA",    "BAJAJ-AUTO", "TECHM", "IOC", "NTPC", "HDFCLIFE", "POWERGRID", "DIVISLAB",    "GAIL", "BAJAJHLDNG", "SBILIFE", "DRREDDY", "HINDALCO", "GRASIM", "JSWSTEEL",    "WIPRO", "SHREECEM", "BRITANNIA", "COALINDIA", "ADANIPORTS", "UBL", "PIDILITIND",    "HDFCAMC", "IOC", "BHARTIARTL", "M&M", "TATAMOTORS", "TATASTEEL", "EICHERMOT",    "HEROMOTOCO", "HINDPETRO", "UPL", "BAJAJ-AUTO", "TATAMOTORS", "CIPLA", "M&M",    "TATASTEEL", "ONGC", "COALINDIA", "HINDALCO", "NTPC", "GAIL", "SUNPHARMA",    "JSWSTEEL", "BPCL", "IOC", "UPL", "CIPLA", "M&M", "HINDPETRO", "TECHM",    "DRREDDY", "HDFCLIFE", "BHARTIARTL", "WIPRO", "TCS", "SHREECEM", "POWERGRID",    "ITC", "DIVISLAB", "SBILIFE", "ASIANPAINT", "BRITANNIA", "HDFCBANK", "ADANIPORTS",    "LT", "AXISBANK", "INFY", "RELIANCE", "HINDUNILVR", "HCLTECH", "NESTLEIND",    "KOTAKBANK", "MARUTI", "TITAN", "HDFC", "ICICIBANK", "BAJFINANCE", "SBIN",    "HDFC", "ICICIBANK", "TCS", "HINDUNILVR", "RELIANCE", "HDFCBANK", "INFY",    "ICICIBANK", "HDFC", "HINDUNILVR", "SBIN", "BAJFINANCE", "BHARTIARTL",    "KOTAKBANK", "AXISBANK", "LT", "ITC", "HCLTECH", "MARUTI", "ASIANPAINT",    "TITAN", "SUNPHARMA", "NESTLEIND", "INDUSINDBK", "ONGC", "DMART", "BAJAJFINSV",    "ULTRACEMCO", "BPCL", "CIPLA", "BAJAJ-AUTO", "TECHM", "IOC", "NTPC",    "HDFCLIFE", "POWERGRID", "DIVISLAB", "GAIL", "BAJAJHLDNG", "SBILIFE", "DRREDDY",    "HINDALCO", "GRASIM", "JSWSTEEL", "WIPRO", "SHREECEM", "BRITANNIA", "COALINDIA",    "ADANIPORTS", "UBL", "PIDILITIND", "HDFCAMC", "IOC", "BHARTIARTL", "M&M",    "TATAMOTORS", "TATASTEEL", "EICHERMOT", "HEROMOTOCO", "HINDPETRO", "UPL",    "BAJAJ-AUTO", "TATAMOTORS", "CIPLA", "M&M", "TATASTEEL", "ONGC", "COALINDIA",    "HINDALCO", "NTPC", "GAIL", "SUNPHARMA", "JSWSTEEL", "BPCL", "IOC", "UPL",    "CIPLA", "M&M", "HINDPETRO", "TECHM", "DRREDDY", "HDFCLIFE", "BHARTIARTL",    "WIPRO", "TCS", "SHREECEM", "POWERGRID", "ITC", "DIVISLAB", "SBILIFE",    "ASIANPAINT", "BRITANNIA", "HDFCBANK", "ADANIPORTS", "LT", "AXISBANK",    "INFY", "RELIANCE", "HINDUNILVR", "HCLTECH", "NESTLEIND", "KOTAKBANK",    "MARUTI", "TITAN", "HDFC", "ICICIBANK", "BAJFINANCE", "SBIN"]


        # Add ".NS" suffix to each company symbol
        symbols = [symbol + ".NS" for symbol in nse_companies]

        processed_data = []
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                stock_data = yf.download(symbol, group_by="ticker", threads=True)

                if stock_data.empty:
                    logger.warning(f"No data available for stock: {symbol}")
                    continue

                latest_data = stock_data.iloc[-1]
                info = ticker.info

                stock_info = StockData(
                    Symbol=symbol,
                    Company=symbol.split(".")[0],
                    Industry=info.get("industry", ""),
                    Sector=info.get("sector", ""),
                    Market="NSE",
                    PE=info.get("trailingPE", None),
                    EPS=info.get("trailingEps", None),
                    MarketCap=info.get("marketCap", None),
                    BookValue=info.get("bookValue", None),
                    DividendYield=info.get("dividendYield", None),
                    EBITDA=info.get("ebitda", None),
                    PriceToSalesTrailing12Months=info.get("priceToSalesTrailing12Months", None),
                    FiftyTwoWeekHigh=info.get("fiftyTwoWeekHigh", None),
                    FiftyTwoWeekLow=info.get("fiftyTwoWeekLow", None),
                    FiftyDayMovingAverage=info.get("fiftyDayAverage", None),
                    TwoHundredDayMovingAverage=info.get("twoHundredDayAverage", None),
                    SharesOutstanding=info.get("sharesOutstanding", None),
                    Price=latest_data["Close"] if not math.isnan(latest_data["Close"]) else None,
                    Quantity=1,  # Set a default quantity or fetch from your database
                    Invested=latest_data["Close"] if not math.isnan(latest_data["Close"]) else None,
                    Weight=0.0  # Set a default weight or calculate based on your criteria
                )
                processed_data.append(stock_info)
            except (KeyError, IndexError) as e:
                logger.error(f"Error processing stock {symbol}: {str(e)}")
            except (ConnectionError, MaxRetryError) as e:
                logger.error(f"Error fetching data for stock {symbol}: {str(e)}")

        return processed_data
    except Exception as e:
        logger.error(f"Error in get_yfinance_stocks endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)