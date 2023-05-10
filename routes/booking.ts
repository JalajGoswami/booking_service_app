import { Router } from 'express'
import { createBooking, getBooking } from '../controller/booking'

const router = Router()

router.post('/', createBooking)
router.get('/', getBooking)

export default router