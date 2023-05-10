import { Router } from 'express'
import { createBooking } from '../controller/booking'

const router = Router()

router.post('/', createBooking)

export default router