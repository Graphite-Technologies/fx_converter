import {useMemo} from "react"
import { CURRENCIES } from "../data/currencies"
import { formatAmount } from "../utils/format"
import { useFavoriteCurrencies } from "../hooks/useFavoriteCurrencies"
import CompareRow from "./CompareRow"


export default function CompareTab({ baseAmount, baseCurrency, excludeCurrency}){
    const {toggle, isFavorite} = useFavoriteCurrencies([])

    const rows = useMemo ( () => {
        const base = CURRENCIES.find((c)=> c.code === baseCurrency)

        if(!base) return [];
        return CURRENCIES.filter(
            (c) => c.code !== baseCurrency && c.code !== excludeCurrency
        ).map( (currency) => {
            const rate = currency.rateToUSD / base.rateToUSD;

            return { currency, rate, amount: baseAmount * rate };
        })
    }, [baseAmount, baseCurrency, excludeCurrency])

    return (
    <section className="compare-tab" aria-label="Multi-currency comparison">
      <div className="compare-tab__header">
        <span className="compare-tab__title">
          MULTI-CURRENCY{' '}
          <strong>
            {formatAmount(baseAmount, { decimals: 0 })} FROM {baseCurrency}
          </strong>
        </span>
        <span className="compare-tab__count">{rows.length} PAIRS</span>
      </div>
 
      <div className="compare-tab__list">
        {rows.map(({ currency, amount, rate }) => (
          <CompareRow
            key={currency.code}
            currency={currency}
            amount={amount}
            rate={rate}
            isFavorite={isFavorite(currency.code)}
            onToggleFavorite={toggle}
          />
        ))}
      </div>
    </section>
  );
}