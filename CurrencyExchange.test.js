import CurrencyExchange from './CurrencyExchange';

let exchange;

beforeEach(() => {
    exchange = new CurrencyExchange([
        { code: 'USD', buy: 3, sell: 4 },
        { code: 'EUR', buy: 4, sell: 5 }
    ]);
});

afterEach(() => {
    exchange = undefined;
});

describe('constructor', () => {

    test.each([
        [undefined],
        [null],
        [{}]
    ])('rzuca wyjątek jeśli brak mu tablicy z danymi', (...args) => {
        expect(() => {
            new CurrencyExchange(...args);
        }).toThrow();
    });

    test('rzuca wyjątek jeśli tablica z danymi jest pusta', () => {
        expect(() => {
            new CurrencyExchange([]);
        }).toThrow();
    });

    test.each([
        [
            [{ code: 'EUR', buy: 3, sell: 4 }],
            [{ code: 'EUR', buy: 3, sell: 4 },{ code: 'USD', buy: 2, sell: 4 },{ code: 'PLN', buy: 3, sell: 4 }]
        ]
    ])('rzuca wyjątek jeśli tablica z danymi ma nieprawidłową długość', (...args) => {
        expect(() => {
            new CurrencyExchange(...args);
        }).toThrow();
    });

    test.each([
        [
            [
                { code: undefined, buy: 3, sell: 4 },
                { code: 'EUR', buy: 4, sell: 5 }
            ],
            [
                { code: null, buy: 3, sell: 4 },
                { code: 'EUR', buy: 4, sell: 5 }
            ]
        ]
    ])('rzuca wyjątek jeśli tablica z danymi ma nieprawidłowy kod waluty', (...args) => {
        expect(() => {
            new CurrencyExchange(...args);
        }).toThrow();
    });

    test.each([
        [
            [
                { code: 'USD', buy: 0, sell: 4 },
                { code: 'EUR', buy: 4, sell: 5 }
            ],
            [
                { code: 'USD', buy: -1, sell: 4 },
                { code: 'EUR', buy: 4, sell: 5 }
            ],
            [
                { code: 'USD', buy: null, sell: 4 },
                { code: 'EUR', buy: 4, sell: 5 }
            ]
        ]
    ])('rzuca wyjątek jeśli tablica z danymi ma nieprawidłową długość', (...args) => {
        expect(() => {
            new CurrencyExchange(...args);
        }).toThrow();
    });


    test('rzuca wyjątek jeśli kurs kupna jest większy niż kurs sprzedaży', () => {
        expect(() => {
            new CurrencyExchange([
                { code: 'USD', buy: 3, sell: 2 }
            ]);
        }).toThrow();
    });
});


// toBe()  - referencja
//toEqual() - deep equal
describe('getCurrencyList', () => {
    test('CurrencyExchange.getCurrencyList jest funkcja', () => {
        const exchange = new CurrencyExchange([
            {code: 'USD', buy: 3, sell: 4},
            {code: 'EUR', buy: 4, sell: 5}
        ]);
        expect(typeof exchange.getCurrencyList).toBe('function');
    });

    test('CurrencyExchange.getCurrencyList zwraca liste walut', () => {
        const exchange = new CurrencyExchange([
            {code: 'USD', buy: 3, sell: 4},
            {code: 'EUR', buy: 4, sell: 5}
        ]);
        expect(exchange.getCurrencyList()).toEqual(['USD','EUR']);
    });
});

describe('getCurrentRate', () => {
    test('CurrencyExchange.getCurrentRate jest funkcja', () => {
        const exchange = new CurrencyExchange([
            {code: 'USD', buy: 3, sell: 4},
            {code: 'EUR', buy: 4, sell: 5}
        ]);
        expect(typeof exchange.getCurrentRate).toBe('function');
    });

    test('CurrencyExchange.getCurrentRate zwraca kurs wymiany dla danej waluty', () => {
        const exchange = new CurrencyExchange([
            {code: 'USD', buy: 3, sell: 4},
            {code: 'EUR', buy: 4, sell: 5}
        ]);
        expect(exchange.getCurrentRate('EUR')).toEqual({
            buy: 4,
            sell: 5
        });
    });
});

describe('buy', () => {
    test('jest funkcją', () => {
        expect(typeof exchange.buy).toBe('function');
    });

    test.each([
        [undefined, undefined],
        [-100, undefined],
        ['EUR', undefined],
        ['EUR', -100]
    ])('rzuca wyjątek jeśli zapodano nieprawidłową nazwę waluty lub ilość (%p %p)', (...args) => {
        expect(() => {
            exchange.buy(...args);
        }).toThrow();
    });

    test('zwraca kwotę do zapłacenia dla zadanego zestawu parametrów', () => {
        expect(exchange.buy('EUR', 10)).toBeCloseTo(40, 2);
        expect(exchange.buy('USD', 100)).toBeCloseTo(300.01, 1);
    });
});

describe('sell', () => {
    test('jest funkcją', () => {
        expect(typeof exchange.sell).toBe('function');
    });

    test.each([
        [undefined, undefined],
        [-100, undefined],
        ['EUR', undefined],
        ['EUR', -100]
    ])('rzuca wyjątek jeśli zapodano nieprawidłową nazwę waluty lub ilość (%p %p)', (...args) => {
        expect(() => {
            exchange.sell(...args);
        }).toThrow();
    });

    test('zwraca kwotę do zapłacenia dla zadanego zestawu parametrów', () => {
        expect(exchange.sell('EUR', 10)).toBeCloseTo(50, 2);
        expect(exchange.sell('USD', 100)).toBeCloseTo(400.01, 1);
    });
});

    describe('fetch', () => {
    test('jest funkcją', () => {
        expect(typeof exchange.fetch).toBe('function');
    });

    test('zwraca kwotę do zapłacenia dla zadanego zestawu parametrów', () => {
        expect(exchange.sell('EUR', 10)).toBeCloseTo(50, 2);
        expect(exchange.sell('USD', 100)).toBeCloseTo(400.01, 1);
    });
});