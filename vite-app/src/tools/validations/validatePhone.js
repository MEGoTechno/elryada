import * as Yup from 'yup'
import { lang } from '../../settings/constants/arlang'


const match = /^(?:9665\d{8}|05\d{8})$/
export const validatePhone = Yup.string().required(lang.REQUERIED).matches(match, "يجب ان يكون رقم صحيح مثل (966512345678, 0512345678)").trim()
