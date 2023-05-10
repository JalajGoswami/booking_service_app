import { Router } from 'express'
import { getSeats } from '../controller/seats'

const router = Router()

router.get('/', getSeats)

export default router