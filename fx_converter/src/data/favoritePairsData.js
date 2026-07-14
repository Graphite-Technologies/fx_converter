import { CURRENCY_MAP } from './currencies.js';


function rateBetween(from, to) {
  return CURRENCY_MAP[to].rateToUSD / CURRENCY_MAP[from].rateToUSD;
}


export const FAVORITE_PAIRS = [
  { id: 1, from: 'USD', to: 'EUR', rate: rateBetween('USD', 'EUR'), change: 0.16 },
  { id: 2, from: 'GBP', to: 'USD', rate: rateBetween('GBP', 'USD'), change: -0.22 },
  { id: 3, from: 'USD', to: 'JPY', rate: rateBetween('USD', 'JPY'), change: 0.84 },
  { id: 4, from: 'USD', to: 'BDT', rate: rateBetween('USD', 'BDT'), change: 0.18 },
  { id: 5, from: 'EUR', to: 'GBP', rate: rateBetween('EUR', 'GBP'), change: 0.11 },
  { id: 6, from: 'AUD', to: 'NZD', rate: rateBetween('AUD', 'NZD'), change: 0.23 },
  { id: 7, from: 'USD', to: 'INR', rate: rateBetween('USD', 'INR'), change: 0.09 },
  { id: 8, from: 'EUR', to: 'CHF', rate: rateBetween('EUR', 'CHF'), change: -0.15 },
  { id: 9, from: 'GBP', to: 'JPY', rate: rateBetween('GBP', 'JPY'), change: 0.12 },
  { id: 10, from: 'USD', to: 'TRY', rate: rateBetween('USD', 'TRY'), change: 0.54 },
];