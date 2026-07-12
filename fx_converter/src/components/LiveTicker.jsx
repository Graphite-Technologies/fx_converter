import {formatPercent} from '../utils/format.js'

function TickerItem({
    pair, rate, change, isHeadline = false, ariaHidden = false
}){
    const isUp = change >= 0;
    return(
        <div 
            className={`ticker-item ${isHeadline ? 'ticker-item--headline': ''}`}
            aria-hidden={ariaHidden || undefined}>
            {!isHeadline && <span className="ticker-item__pair">{pair}</span>}
            {rate !== null && !isHeadline && <span className="ticker-item__rate">{rate}</span>}
            <span className={`ticker-item__change ${isUp ? 'is-up' : 'is-down'}`}>
                {!isHeadline && (isUp ? '▲' : '▼')}{formatPercent(change)}
            </span>
        </div>
    );
}

export default function LiveTicker({pairs, label = 'LIVE MARKETS'}){
    return (
        <div className='live-ticker' aria-label='Live currency markets'>
            <span className='live-ticker__label'>
                <span className='live-ticker__dot' aria-hidden="true"/>
                {label}
            </span>
            <div className='live-ticker__viewport'>
                <div className='live-ticker__track'>
                    {pairs.map((p) => (
                        <TickerItem key={`a-${p.pair}`} {...p} ariaHidden/>
                        ))}

            </div>
        </div>
        </div>
    )
}