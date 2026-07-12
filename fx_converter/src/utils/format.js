
export function formatAmount(value, {decimals = 2} = {}){
    if (Number.isNaN(value) || value === null || value == undefined) return '';
    return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}


/** Parses user-typed input into float, 
 * stripping anything that  isn't a digit or a decimal point.
 * Keeps input controlled while still tolerating pasted, comma-formatted values
 *
 **/
export function parseAmount(raw){
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const value = parseFloat(cleaned)
    return Number.isNaN(value ) ? 0 : value
}

export function formatSigned(value, decimals = 4){
    const sign = value > 0 ? '+' : value < 0 ? '' : '±';
    return `${sign}${value.toFixed(decimals)}`;

}

export function formatPercent(value, decimals = 2){
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`
}