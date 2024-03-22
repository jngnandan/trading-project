from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, Float, String, MetaData, Table
from sqlalchemy.orm import sessionmaker

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


@app.post("/add-stock/")
async def add_stock(
    ticker: str,
    amount: float,
    status: str,
    email: str,
    company: str,
    sector: str,
    industry: str,
    country: str,
    market: float,
    pe: float,
    price: float,
    change: str,
    volume: int,
):
    try:
        # Create a new session
        db = SessionLocal()

        # Insert data into the table
        db.execute(
            table.insert().values(
                ticker=ticker,
                amount=amount,
                status=status,
                email=email,
                company=company,
                sector=sector,
                industry=industry,
                country=country,
                market=market,
                pe=pe,
                price=price,
                change=change,
                volume=volume,
            )
        )
        db.commit()

        return {"message": f"Stock '{ticker}' added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
