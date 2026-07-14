import { formatPercent } from "../utils/format.js";


export default function ChangeIndicator({value, decimals = 2, showArrow = true, className = ''}){
    const isUp = value >= 0;
    return (
        <span className={`change-indicator ${isUp ? 'is-up' : 'is-down'} ${className}`}>
            {showArrow ? (isUp ? '▲ ' : '▼ ') : ''}
            {formatPercent(value, decimals)}
        </span>
    )
}