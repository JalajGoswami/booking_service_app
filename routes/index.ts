import { Router } from 'express'
import seatsRouter from './seats'
import bookingRouter from './booking'

const router = Router()

router.use('/seats', seatsRouter)
router.use('/booking', bookingRouter)

export default router