import Form, { FormFieldConfig } from '../../components/common/Form'
import LoadingOverlay from '../../components/common/LoadingOverlay'
import Modal from '../../components/common/Modal'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { topUp } from '../../store/slices/transactionSlice'
import * as P from '../../styles/Page.style'
import FundSource from '../../types/FundSource'
import Transaction from '../../types/Transaction'
import * as S from './Topup.style'
import validationSchema from './validationSchema'

interface TopUpFormValue {
  source_of_fund_id: FundSource
  to: string
  amount: number
}

const Topup = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { transactions, postLoading, error } = useAppSelector((state) => state.transactions)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [lastTransaction, setLastTransaction] = useState<Transaction | undefined>(undefined)
  const [value] = useState<TopUpFormValue>({
    source_of_fund_id: FundSource.BANK_TRANSFER,
    to: user?.wallet_number ?? '',
    amount: 0,
  })
  const [formFieldConfigs] = useState<FormFieldConfig[]>([
    {
      name: 'source_of_fund_id',
      label: 'From',
      type: 'dropdown',
      options: [
        {
          value: FundSource.BANK_TRANSFER,
          text: 'Bank Transfer',
        },
        {
          value: FundSource.CREDIT_CARD,
          text: 'Credit Card',
        },
        {
          value: FundSource.CASH,
          text: 'Cash',
        },
      ],
    },
    {
      name: 'to',
      label: 'To',
      type: 'input',
      inputType: 'text',
      disabled: true,
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'input',
      inputType: 'number',
    },
  ])

  useEffect(() => {
    if (transactions.length > 0) {
      setLastTransaction(transactions[0])
    }
  }, [postLoading])

  const onSubmitHandler = async (values: TopUpFormValue) => {
    await dispatch(topUp(values)).then(() => {
      setShowModal(true)
    })
  }

  const onCloseModal = () => {
    setShowModal(false)
    if (!error) {
      navigate('/')
    }
  }

  return (
    <P.PageContainer>
      <P.PageHeader>Top Up</P.PageHeader>
      <S.Container>
        <Form
          initialValues={value}
          formFieldConfigs={formFieldConfigs}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
          btnText='Top up'
          btnDisable={postLoading}
        />
      </S.Container>
      {showModal && (
        <Modal
          transaction={lastTransaction}
          onClose={onCloseModal}
          error={error}
          name='Top Up'
        />
      )}

      {postLoading && <LoadingOverlay />}
    </P.PageContainer>
  )
}

export default Topup
