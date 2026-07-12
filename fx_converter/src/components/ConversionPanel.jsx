import {useState} from 'react'
import CurrencyInput from './CurrencyInput.jsx'
import IconButton from './IconButton.jsx'
import { formatAmount } from '../utils/format.js'
import { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'

export default function ConversionPanel({
    onLogConversion
}){
    const converter = useCurrencyConverter()
    const [swapVersion, setSwapVersion] = useState(0);
    
    function handleSwap(){
        converter.swap();
        setSwapVersion((v) => v + 1 );
    }

    return (
        <section className='conversion-panel' aria-label='Currency converter'>
            <h2 className='conversion-panel__title'>CHECK THE RATE</h2>

            <div className='conversion-panel__row'>
                <CurrencyInput
                    label= "SEND"
                    amount = {converter.sendAmount}
                    currency = {converter.sendCurrency}
                    onAmountChange = {converter.setSendAmount}
                    onCurrencyChange = {converter.setSendCurrency}
                    excludingCurrency = {converter.receiveCurrency}

                    resetKey = {swapVersion}
                />

                <IconButton variant="ghost" ariaLabel="Swap currencies" onClick={handleSwap}>
                    ⇄
                </IconButton>

                <CurrencyInput
                    label="RECEIVE"
                    amount = {converter.receiveAmount}
                    currency={converter.receiveCurrency}
                    onAmountChange={ () => {}}
                    onCurrencyChange={converter.setReceiveCurrency}
                    excludingCurrency={converter.sendCurrency}
                    readOnly
                    accent
                />
            </div>

             <div className="conversion-panel__footer">
                <span className="conversion-panel__rate">
                1 {converter.sendCurrency} = {formatAmount(converter.rate, { decimals: 4 })}{' '}
                {converter.receiveCurrency}
                </span>
        
                <div className="conversion-panel__actions">
                <IconButton
                    variant="outline"
                    active={converter.isFavorited}
                    onClick={converter.toggleFavorite}
                >
                    ★ {converter.isFavorited ? 'FAVORITED' : 'FAVORITE'}
                </IconButton>
                <IconButton
                    variant="outline"
                    onClick={() =>
                    onLogConversion?.({
                        send: { amount: converter.sendAmount, currency: converter.sendCurrency },
                        receive: { amount: converter.receiveAmount, currency: converter.receiveCurrency },
                        rate: converter.rate,
                    })
                    }
                >
                    LOG CONVERSION
                </IconButton>
        </div>
      </div>
        </section>
    )
}