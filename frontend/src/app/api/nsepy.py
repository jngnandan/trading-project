from nsepy import get_history

symbol = sys.argv[1]  # Get symbol from command-line arguments
start_date = sys.argv[2]  # Get start date from command-line arguments
end_date = sys.argv[3]  # Get end date from command-line arguments

# Fetch stock data
data = get_history(symbol=symbol, start=start_date, end=end_date)
print(data)
