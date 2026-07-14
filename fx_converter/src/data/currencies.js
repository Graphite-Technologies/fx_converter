export const CURRENCIES = [
   { code: 'USD', name: 'US Dollar', flag: '/flags/us.svg', rateToUSD: 1 },
  { code: 'EUR', name: 'Euro', flag: '/flags/eu.svg', rateToUSD: 0.85302 },
  { code: 'GBP', name: 'British Pound', flag: '/flags/gb.svg', rateToUSD: 0.73666 },
  { code: 'JPY', name: 'Japanese Yen', flag: '/flags/jp.svg', rateToUSD: 157.91 },
  { code: 'CHF', name: 'Swiss Franc', flag: '/flags/ch.svg', rateToUSD: 0.9098 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '/flags/ca.svg', rateToUSD: 1.3815 },
  { code: 'AUD', name: 'Australian Dollar', flag: '/flags/au.svg', rateToUSD: 1.38735 },
  { code: 'INR', name: 'Indian Rupee', flag: '/flags/in.svg', rateToUSD: 94.91 },
  { code: 'CNY', name: 'Chinese Yuan', flag: '/flags/cn.svg', rateToUSD: 7.21 },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '/flags/bd.svg', rateToUSD: 122.92 },
]

export const CURRENCY_MAP = Object.fromEntries(
    CURRENCIES.map((c) => [c.code, c])
)