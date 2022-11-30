import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axios'
import FundSource from '../../types/FundSource'
import Transaction from '../../types/Transaction'
import { getProfile } from './authSlice'

interface TransactionState {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  loading: boolean
  postLoading: boolean
  error: string
}

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  loading: false,
  postLoading: false,
  error: '',
}

export const getTransactions = createAsyncThunk('transactions/getTransactions', async () => {
  const response = await axiosInstance.get('/transactions?limit=1000&page=1')
  const transactions = (response.data.data.data as Transaction[]).map((transaction) => ({
    ...transaction,
    amount: transaction.status === 'INCOME' ? transaction.amount : transaction.amount * -1,
  }))

  return transactions
})

interface TopUpBody {
  amount: number
  source_of_fund_id: FundSource
}

export const topUp = createAsyncThunk('transactions/topUp', async (body: TopUpBody, thunkAPI) => {
  if (typeof body.source_of_fund_id === 'string') {
    body.source_of_fund_id = parseInt(body.source_of_fund_id, 10)
  }
  await axiosInstance.post('/transactions/top-up', body)
  await thunkAPI.dispatch(getTransactions())
  await thunkAPI.dispatch(getProfile())
})

interface TransferBody {
  amount: number
  to: string
  description: string
}

export const transfer = createAsyncThunk(
  'transactions/transfer',
  async (body: TransferBody, thunkAPI) => {
    await axiosInstance.post('/transactions/transfer', body)
    await thunkAPI.dispatch(getTransactions())
    await thunkAPI.dispatch(getProfile())
  }
)

export const transactionsSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false
      state.transactions = action.payload
    })
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getTransactions.rejected, (state) => {
      state.loading = false
      state.error = 'Failed to get transactions history. Please try again later'
    })
    builder.addCase(topUp.fulfilled, (state) => {
      state.postLoading = false
    })
    builder.addCase(topUp.pending, (state) => {
      state.postLoading = true
      state.error = ''
    })
    builder.addCase(topUp.rejected, (state) => {
      state.postLoading = false
      state.error = 'Failed to top up. Please try again later'
    })
    builder.addCase(transfer.fulfilled, (state) => {
      state.postLoading = false
    })
    builder.addCase(transfer.pending, (state) => {
      state.postLoading = true
      state.error = ''
    })
    builder.addCase(transfer.rejected, (state, action) => {
      state.postLoading = false
      if (action.error.code === 'ERR_BAD_REQUEST') {
        state.error = 'Please enter a valid target user'
      } else {
        state.error = 'Failed to transfer. Please try again later'
      }
    })
  },
})

export default transactionsSlice.reducer
