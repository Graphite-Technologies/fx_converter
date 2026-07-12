import { useCallback, useMemo, useState } from "react";

import { CURRENCY_MAP } from "../data/currencies";

export function useCurrencyConverter({
    initialSendAmount = 1000,
    initialSendCurrency = 'USD',
    initialReceiveCurrency = 'EUR',
} = {}){
    
    const [sendAmount, setSendAmount] = useState(initialSendAmount)
    const [sendCurrency, setSendCurrency] = useState(initialSendCurrency)
    const [receiveCurrency, setReceiveCurrency] = useState(initialReceiveCurrency)
    const [isFavorited, setIsFavorited] = useState(true)

    const rate = useMemo( () =>{
        const from = CURRENCY_MAP[sendCurrency];
        const to = CURRENCY_MAP[receiveCurrency];
        if (!from || !to ) return 0;

        return to.rateToUSD / from.rateToUSD;
    }, [sendCurrency, receiveCurrency]);

    const receiveAmount = useMemo( () => sendAmount * rate, [sendAmount, rate]);

    const swap = useCallback( () =>{
        setSendCurrency(receiveCurrency);
        setReceiveCurrency(sendCurrency);
    }, [sendCurrency, receiveCurrency]);

    const toggleFavorite = useCallback( () => setIsFavorited((v) => ! v), []);

    return {
        sendAmount,
        setSendAmount,
        sendCurrency,
        setSendCurrency,
        receiveCurrency,
        setReceiveCurrency,
        receiveAmount,
        rate,
        swap,
        isFavorited,
        toggleFavorite,
    }
}