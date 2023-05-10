import * as Yup from 'yup'

export const createBookingSchema = Yup.object({
    email: Yup.string()
        .email('Not a valid Email')
        .required('Email is required'),
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Name too short'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Not a valid Phone No.')
        .required('Phone No. is required'),
    seats: Yup.array()
        .of(Yup.number())
        .min(1, 'Atleast 1 seat required')
        .required('Seats is required')
}).noUnknown()

export const getBookingSchema = Yup.object({
    email: Yup.string()
        .email('Not a valid Email'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Not a valid Phone No.')
}).noUnknown()