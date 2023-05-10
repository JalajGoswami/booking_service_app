import { Router } from 'express'
import { getSeats, getSeat } from '../controller/seats'

const router = Router()

router.get('/', getSeats)
router.get('/:id', getSeat)

export default router