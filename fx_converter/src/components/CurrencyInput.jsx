import { useEffect, useState } from "react";
import {CURRENCIES, CURRENCY_MAP} from "../data/currencies.js"
import { formatAmount, parseAmount } from "../utils/format.js";
import FlagIcon from "./FlagIcon.jsx";

function CurrencySelect({value, onChange, excluding}){
    const options = CURRENCIES.filter((c)=> c.code != excluding);
   return(
    <div className="currency-select">
            <FlagIcon src={CURRENCY_MAP[value]?.flag}/>
            <select
                value = {value}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Currency">
                    <option value={value}>{value}</option>
                    {options.map((c)=>(
                        <option key={c.code} value={c.code}>
                            {c.code}
                        </option>
                    ))}
                </select>
        </div>
   )
}

export default function CurrencyInput({
    label,
    amount,
    currency,
    onAmountChange,
    onCurrencyChange,
    excludingCurrency,
    readOnly = false,
    accent = false,
    resetKey,
}){
    const [draft, setDraft] = useState(formatAmount(amount, {decimals: 0}))

    useEffect( () => {
        setDraft(formatAmount(amount, {decimals: 0}))

    }, [resetKey]);

    function handleChange(e) {
        const raw = e.target.value;
        setDraft(raw);
        onAmountChange(parseAmount(raw));
    }

    function handleBlur(){
        setDraft(formatAmount(amount, {decimals: readOnly ? 2 : 0}));
    }

    const displayValue = readOnly ? formatAmount(amount, { decimals: 2 }) : draft;

    return (
        <div className="currency-box">
            <span className="currency-box__label">{label}</span>
            <div className="currency-box__row">
                {readOnly ? (
                    <span className={`currency-box__value ${accent ? 'is-accent' : ''}`}>
                        {displayValue}
                    </span>
                ): (
                    <input
                        className="currency-box__input"
                        inputMode="decimal"
                        value={displayValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-label={`${label} amount`}
                    />
                )}
                <CurrencySelect
                    value={currency}
                    onChange={onCurrencyChange}
                    excluding={excludingCurrency}
                />
            </div>
        </div>
    )
}