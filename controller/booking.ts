import { Request, Response } from 'express'
import db from '../prisma/db'
import { getError } from '../utils/errorHandlers'
import { createBookingSchema, getBookingSchema } from '../utils/schema'

export async function createBooking(req: Request, res: Response) {
    try {
        const body = createBookingSchema.validateSync(req.body)

        const seatIds = body.seats.filter(Boolean).map(id => ({ id }))

        const bookedSeat = await db.seat.findFirst({
            where: {
                id: { in: body.seats.filter(Boolean) as number[] }
            }
        })

        if (bookedSeat)
            throw Error(`Seat ${bookedSeat.id} is already booked`)

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

export async function getBooking(req: Request, res: Response) {
    try {
        const query = getBookingSchema.validateSync(req.query)

        if (!query.email && !query.phone)
            throw Error('Provide email or phone')

        const data = await db.booking.findMany({
            where: query
        })

        res.json(data)
    }
    catch (err) {
        const error = getError(err)
        return res.status(400).json({ error })
    }
}