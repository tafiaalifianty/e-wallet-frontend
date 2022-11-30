interface Transaction {
    id: number
    amount: number
    status: 'INCOME' | 'OUTCOME'
    description: string
    date: string
    source_of_fund?: string
    sender: string
    recipient: string
}

export enum TransactionFilterTime {
    Last10Transactions = 'LAST_10',
    ThisMonth = 'THIS_MONTH',
    LastMonth = 'LAST_MONTH',
    ThisYear = 'THIS_YEAR',
    LastYear = 'LAST_YEAR',
}

export enum TransactionSortBy {
    DATE = 'date',
    AMOUNT = 'amount',
}
export enum TransactionSortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export default Transaction
