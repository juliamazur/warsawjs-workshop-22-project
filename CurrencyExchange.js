export default class CurrencyExchange {

    constructor(exchangeRates) {
        if (!Array.isArray(exchangeRates) || exchangeRates.length !== 2) {
            throw new Error('Invalid exchange rates');
        }

        const { names, rates } = exchangeRates.reduce((accum, { code, buy, sell }) => {
            if (!code || buy <= 0 || sell <= 0 || buy > sell) {
            // if (!code || typeof code !== 'string' || buy <= 0 || sell <= 0 || buy > sell) {
                throw new Error('Invalid currency data');
            }
            accum.names.push(code);
            accum.rates[code] = { buy, sell };
            return accum;
        }, { names: [], rates: {} });

        this.currencies = names;
        this.rates = rates;
    }

    getCurrencyList() {
        return this.currencies;
    }

    getCurrentRate(currencyCode) {
        return this.rates[currencyCode];
    }

    buy(currencyCode, amount) {
        if (!currencyCode || typeof currencyCode !== 'string' || !amount || amount < 0) {
            throw new Error('Invalid exchange rates');
        }

        return amount * this.rates[currencyCode].buy;
    }

    sell(currencyCode, amount) {
        if (!currencyCode || typeof currencyCode !== 'string' || !amount || amount < 0) {
            throw new Error('Invalid exchange rates');
        }

        return amount * this.rates[currencyCode].sell;
    }

    fetchUsd() {
        const usdUrl = 'http://api.nbp.pl/api/exchangerates/rates/a/usd/';
        return fetch(this.usdUrl);
    }

    fetch(url) {
        fetch(url) // Call the fetch function passing the url of the API as a parameter
            .then(function() {
                return true;
            })
            .catch(function() {
                throw new Error('API Fetch Error.');
            });
    }
}