
export const currencyFormat = (value) => {
    var num = (parseInt(value ? value.replace(',', '') : '0'))
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(num);
}


