import { Request, Response } from 'express'
import db from '../prisma/db'
import { getError } from '../services/errorHandlers'
import { Seat } from '@prisma/client'

export async function getSeats(req: Request, res: Response) {
    const seats = await db.seat.findMany({
        orderBy: { seat_class: 'asc' }
    })

    type Result = Partial<Seat> & { is_booked?: boolean }
    let data: Result[] = seats

    data.forEach(seat => {
        seat.is_booked = Boolean(seat.bookingId)
        delete seat.bookingId
    })
    
    return res.json(data)
}