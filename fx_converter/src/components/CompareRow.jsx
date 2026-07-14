import IconButton from "./IconButton";
import { formatAmount } from "../utils/format";
import FlagIcon from "./FlagIcon";

export default function CompareRow({currency, amount, rate, isFavorite, onToggleFavorite}){
    return (
        <div className="compare-row">
            <FlagIcon src={currency.flag} className="compare-row__flag" />

            <div className="compare-row__identity">
                <span className="compare-row__code">{currency.code}</span>
                <span className="compare-row__name">{currency.name}</span>
            </div>

            <div className="compare-row__figures">
                <span className="compare-row__amount">{formatAmount(amount, {decimals:2})}</span>
                <span className="compare-row__rate">@ {formatAmount(rate, {decimals: 4})}</span>
            </div>

            <IconButton
                variant="star"
                active={isFavorite}
                ariaLabel={`${isFavorite ? 'Remove' : 'Add'} ${currency.code} favorite`}
                onClick={() => onToggleFavorite(currency.code)}
            >
                {isFavorite ? '★' : '☆'}
            </IconButton>
        </div>
    )
}