import sqlite3
import json

# Connect to SQLite database
conn = sqlite3.connect('stocks.db')
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS stocks
             (Symbol TEXT, Company TEXT, Industry TEXT, Sector TEXT, Market TEXT,
             PE REAL, EPS REAL, MarketCap REAL, BookValue REAL, DividendYield REAL,
             EBITDA REAL, PriceToSalesTrailing12Months REAL, FiftyTwoWeekHigh REAL,
             FiftyTwoWeekLow REAL, FiftyDayMovingAverage REAL, TwoHundredDayMovingAverage REAL,
             SharesOutstanding REAL, Price REAL, Quantity INTEGER, Invested REAL, Weight REAL)''')

# Function to insert or update data from JSON into SQLite table
def insert_or_update_data_from_json(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
        for item in data:
            cursor.execute('''INSERT OR REPLACE INTO stocks VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                           (item['Symbol'], item['Company'], item['Industry'], item['Sector'], item['Market'],
                            item['PE'], item['EPS'], item['MarketCap'], item['BookValue'], item['DividendYield'],
                            item['EBITDA'], item['PriceToSalesTrailing12Months'], item['FiftyTwoWeekHigh'],
                            item['FiftyTwoWeekLow'], item['FiftyDayMovingAverage'], item['TwoHundredDayMovingAverage'],
                            item['SharesOutstanding'], item['Price'], item['Quantity'], item['Invested'], item['Weight']))

# Insert or update data from JSON file
insert_or_update_data_from_json('yfinance.json')

# Commit changes and close connection
conn.commit()
conn.close()

print("Data from JSON file inserted or updated successfully.")
