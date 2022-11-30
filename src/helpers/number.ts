export const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })
        .format(amount)
        .replace('Rp', 'IDR')
}

export const formatNumber = (amount: number) => {
    return formatIDR(amount).replace('IDR', '')
}

export const formatNumberWithout2Zeros = (amount: number) => {
    return formatNumber(amount).replace(',00', '')
}
