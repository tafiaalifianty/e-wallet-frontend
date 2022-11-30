import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axiosInstance from '../../api/axios'
import { MAX_TRANSFER_AMOUNT, MIN_TRANSFER_AMOUNT } from '../../constants/number'
import { renderWithProviders } from '../../helpers/testHelpers'
import { createMemoryHistory } from 'history'
import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import { RootState } from '../../store'
import Transaction from '../../types/Transaction'
import Transfer from './Transfer'

const RouterWrapped = () => (
  <BrowserRouter>
    <Transfer />
  </BrowserRouter>
)

const mockTransaction: Transaction = {
  id: 1,
  amount: 50000,
  status: 'INCOME',
  description: 'Top up from Credit Card',
  date: '2018-01-01 14:10:10',
  source_of_fund: 'Credit Card',
  sender: 'User',
  recipient: 'User 2',
}

const typeValidInput = async () => {
  const validDescription = 'description'
  const validAmount = MIN_TRANSFER_AMOUNT + 1
  const validTo = 'to'

  const descriptionInput = screen.getByLabelText(/description/i)
  userEvent.type(descriptionInput, validDescription)
  await waitFor(() => {
    expect(descriptionInput).toHaveValue(validDescription)
  })
  const amountInput = screen.getByLabelText(/amount/i)
  userEvent.type(amountInput, validAmount.toString())
  await waitFor(() => {
    expect(amountInput).not.toHaveValue(0)
  })
  const toInput = screen.getByLabelText(/to/i)
  userEvent.type(toInput, validTo)
  await waitFor(() => {
    expect(toInput).toHaveValue(validTo)
  })
}

const mockAPICall = {
  successfulTransfer: Promise.resolve({
    data: {
      code: 200,
      message: 'Top up success',
      data: {
        amount: 50000,
        status: 'INCOME',
        description: 'Top up from Credit Card',
        date: '2018-01-01 14:10:10',
        balance: 50000,
        recipient: 'User 2',
      },
      is_error: false,
    },
  }),
  successfulGetTransactions: Promise.resolve({
    data: {
      code: 200,
      message: 'Transaction data',
      data: {
        data: [mockTransaction],
      },
      is_error: false,
    },
  }),
}

const preloadedState: RootState = {
  auth: {
    loading: false,
    loginLoading: false,
    error: '',
    user: {
      name: 'name',
      email: 'email',
      wallet_number: '123',
      balance: 1,
    },
  },
  transactions: {
    transactions: [],
    filteredTransactions: [],
    loading: false,
    postLoading: false,
    error: '',
  },
}

const renderWithPreloadedState = (children: React.ReactElement) => {
  renderWithProviders(children, { preloadedState })
}

describe('Transfer', () => {
  describe('Validation', () => {
    test('should not submit when "to" field is empty', async () => {
      renderWithPreloadedState(<RouterWrapped />)

      const toInput = screen.getByLabelText(/to/i)
      expect(toInput).toHaveValue('')

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(screen.getByText('Recipient is required')).toBeInTheDocument()
      })
    })

    test('should not submit when "description" field is empty', async () => {
      renderWithPreloadedState(<RouterWrapped />)

      const descriptionInput = screen.getByLabelText(/description/i)
      expect(descriptionInput).toHaveValue('')

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(screen.getByText('Description is required')).toBeInTheDocument()
      })
    })

    describe('Amount', () => {
      test('should not submit when "amount" field is empty', async () => {
        renderWithPreloadedState(<RouterWrapped />)

        const amountInput = screen.getByLabelText(/amount/i)
        userEvent.clear(amountInput)
        await waitFor(() => {
          expect(amountInput).not.toHaveValue(0)
        })

        const submitBtn = screen.getByRole('button', { name: 'Transfer' })
        userEvent.click(submitBtn)
        await waitFor(() => {
          expect(screen.getByText('Amount is required')).toBeInTheDocument()
        })
      })
    })

    test('should not submit when "amount" field is less than 1.000', async () => {
      const typedInput = (MIN_TRANSFER_AMOUNT - 1).toString()
      renderWithPreloadedState(<RouterWrapped />)

      const amountInput = screen.getByLabelText(/amount/i)
      userEvent.type(amountInput, typedInput)
      await waitFor(() => {
        expect(amountInput).not.toHaveValue(0)
      })

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(screen.getByText('Minimum amount is 1.000')).toBeInTheDocument()
      })
    })

    test('should not submit when "amount" field is more than 50.000.000', async () => {
      const typedInput = (MAX_TRANSFER_AMOUNT + 1).toString()
      renderWithPreloadedState(<RouterWrapped />)

      const amountInput = screen.getByLabelText(/amount/i)
      userEvent.type(amountInput, typedInput)
      await waitFor(() => {
        expect(amountInput).not.toHaveValue(0)
      })

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(screen.getByText('Maximum amount is 50.000.000')).toBeInTheDocument()
      })
    })
  })

  describe('API Call', () => {
    test('should show success modal if API Call is success', async () => {
      renderWithPreloadedState(<RouterWrapped />)

      const mockTransfer = jest.spyOn(axiosInstance, 'post')
      mockTransfer.mockReturnValueOnce(mockAPICall.successfulTransfer)

      const mockGetTransactions = jest.spyOn(axiosInstance, 'get')
      mockGetTransactions.mockReturnValueOnce(mockAPICall.successfulGetTransactions)

      await typeValidInput()

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(mockTransfer).toBeCalled()
        expect(mockGetTransactions).toBeCalled()
        expect(screen.getByText('Transfer Success')).toBeInTheDocument()
      })

      expect(screen.getByText(mockTransaction.sender)).toBeInTheDocument()
      expect(screen.getByText(mockTransaction.recipient)).toBeInTheDocument()
      expect(screen.getByText(mockTransaction.description)).toBeInTheDocument()
    })

    test('should navigate to / page when clicking on modal close btn', async () => {
      const history = createMemoryHistory()
      history.push('/random-route')
      renderWithPreloadedState(
        <Router
          location={history.location}
          navigator={history}
        >
          <Transfer />
        </Router>
      )

      const mockTransfer = jest.spyOn(axiosInstance, 'post')
      mockTransfer.mockReturnValueOnce(mockAPICall.successfulTransfer)

      const mockGetTransactions = jest.spyOn(axiosInstance, 'get')
      mockGetTransactions.mockReturnValueOnce(mockAPICall.successfulGetTransactions)

      await typeValidInput()

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(mockTransfer).toBeCalled()
        expect(mockGetTransactions).toBeCalled()
        expect(screen.getByText('Transfer Success')).toBeInTheDocument()
      })

      const closeBtn = screen.getByRole('button', { name: /close/i })
      userEvent.click(closeBtn)
      await waitFor(() => {
        expect(history.location.pathname).toBe('/')
      })
    })

    test('should navigate to / page when clicking on modal print btn', async () => {
      const history = createMemoryHistory()
      history.push('/random-route')
      renderWithPreloadedState(
        <Router
          location={history.location}
          navigator={history}
        >
          <Transfer />
        </Router>
      )

      const mockTransfer = jest.spyOn(axiosInstance, 'post')
      mockTransfer.mockReturnValueOnce(mockAPICall.successfulTransfer)

      const mockGetTransactions = jest.spyOn(axiosInstance, 'get')
      mockGetTransactions.mockReturnValueOnce(mockAPICall.successfulGetTransactions)

      await typeValidInput()

      const submitBtn = screen.getByRole('button', { name: 'Transfer' })
      userEvent.click(submitBtn)
      await waitFor(() => {
        expect(mockTransfer).toBeCalled()
        expect(mockGetTransactions).toBeCalled()
        expect(screen.getByText('Transfer Success')).toBeInTheDocument()
      })

      const closeBtn = screen.getByRole('button', { name: /print/i })
      userEvent.click(closeBtn)
      await waitFor(() => {
        expect(history.location.pathname).toBe('/')
      })
    })
  })
})
