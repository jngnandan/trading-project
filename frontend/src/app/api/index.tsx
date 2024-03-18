const { NseIndia } = require("stock-nse-india");

const nseIndia = new NseIndia();

// To get all symbols from NSE
nseIndia.getAllStockSymbols().then(symbols => {
    console.log(symbols);
}).catch(error => {
    console.error('Error fetching symbols:', error);
});

// To get equity details for specific symbol
nseIndia.getEquityDetails('IRCTC').then(details => {
    console.log(details);
}).catch(error => {
    console.error('Error fetching equity details:', error);
});

// To get equity historical data for specific symbol
const symbol = 'IRCTC'; // Define the symbol variable
const range = {
    start: new Date("2010-01-01"),
    end: new Date("2021-03-20")
};

nseIndia.getEquityHistoricalData(symbol, range).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error fetching historical data:', error);
});
