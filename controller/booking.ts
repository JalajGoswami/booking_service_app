import { Request, Response } from 'express'
import db from '../prisma/db'
import { getError } from '../utils/errorHandlers'
import { createBookingSchema } from '../utils/schema'

export async function createBooking(req: Request, res: Response) {
    try {
        const body = createBookingSchema.validateSync(req.body)

        const seatIds = body.seats.filter(Boolean).map(id => ({ id }))

        const bookedSeat = await db.seat.findFirst({
            where: {
                id: { in: body.seats.filter(Boolean) as number[] }
            }
        })

        if (bookedSeat) {
            return res.status(400)
                .json({ error: `Seat ${bookedSeat.id} is already booked` })
        }

        const data = await db.booking.create({
            data: {
                ...body,
                seats: { connect: seatIds }
            }
        })

        res.json(data)
    }
    catch (err) {
        const error = getError(err)
        return res.status(400).json({ error })
    }
}