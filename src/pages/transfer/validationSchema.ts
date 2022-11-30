import { MAX_TRANSFER_AMOUNT, MIN_TRANSFER_AMOUNT } from '../../constants/number'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  to: Yup.string().required('Recipient is required'),
  amount: Yup.number()
    .min(MIN_TRANSFER_AMOUNT, 'Minimum amount is 1.000')
    .max(MAX_TRANSFER_AMOUNT, 'Maximum amount is 50.000.000')
    .required('Amount is required'),
  description: Yup.string().required('Description is required'),
})

export default validationSchema
