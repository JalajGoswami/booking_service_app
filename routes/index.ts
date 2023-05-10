import { Router } from 'express'
import seatsRouter from './seats'

const router = Router()

router.use('/seats', seatsRouter)

export default router