import Form, { FormFieldConfig } from '../../components/common/Form'
import LoadingOverlay from '../../components/common/LoadingOverlay'
import Modal from '../../components/common/Modal'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { transfer } from '../../store/slices/transactionSlice'
import * as P from '../../styles/Page.style'
import Transaction from '../../types/Transaction'
import * as S from './Transfer.style'
import validationSchema from './validationSchema'

interface TransferFormValue {
  from: string
  to: string
  amount: number
  description: string
}

const Transfer = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { transactions, postLoading, error } = useAppSelector((state) => state.transactions)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [lastTransaction, setLastTransaction] = useState<Transaction | undefined>(undefined)
  const [value] = useState<TransferFormValue>({
    from: user?.wallet_number ?? '',
    to: '',
    amount: 0,
    description: '',
  })
  const [formFieldConfigs] = useState<FormFieldConfig[]>([
    {
      name: 'from',
      label: 'From',
      type: 'dropdown',
      disabled: true,
      options: [
        {
          value: user?.wallet_number,
          text: user?.wallet_number ?? '',
        },
      ],
    },
    {
      name: 'to',
      label: 'To',
      type: 'input',
      inputType: 'text',
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'input',
      inputType: 'number',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'input',
    },
  ])

  useEffect(() => {
    if (transactions.length > 0) {
      setLastTransaction(transactions[0])
    }
  }, [postLoading])

  const onSubmitHandler = async (values: TransferFormValue) => {
    await dispatch(transfer(values)).then(() => {
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
      <P.PageHeader>Transfer</P.PageHeader>
      <S.Container>
        <Form
          initialValues={value}
          formFieldConfigs={formFieldConfigs}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
          btnText='Transfer'
          btnDisable={postLoading}
        />
      </S.Container>
      {showModal && (
        <Modal
          transaction={lastTransaction}
          onClose={onCloseModal}
          error={error}
          name='Transfer'
        />
      )}

      {postLoading && <LoadingOverlay />}
    </P.PageContainer>
  )
}

export default Transfer
