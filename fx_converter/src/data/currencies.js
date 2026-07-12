export const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rateToUSD: 1 },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', rateToUSD: 0.85302 },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rateToUSD: 0.73666 },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rateToUSD: 157.91 },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', rateToUSD: 0.9098 },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', rateToUSD: 1.38735 },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', rateToUSD: 1.3815 },
]

export const CURRENCY_MAP = Object.fromEntries(
    CURRENCIES.map((c) => [c.code, c])
)