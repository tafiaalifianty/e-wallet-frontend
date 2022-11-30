import { MAX_TOPUP_AMOUNT, MIN_TOPUP_AMOUNT } from '../../constants/number'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(MIN_TOPUP_AMOUNT, 'Minimum amount is 50.000')
    .max(MAX_TOPUP_AMOUNT, 'Maximum amount is 10.000.000')
    .required('Amount is required'),
})

export default validationSchema
