import moment from 'moment'

export const formatTableDate = (date: string) => {
  return moment(date).format('hh:mm - DD MMMM YYYY')
}
