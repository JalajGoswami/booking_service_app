import { Request, Response } from 'express'
import db from '../prisma/db'
import { getError } from '../utils/errorHandlers'
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

export async function getSeat(req: Request, res: Response) {
    const { id } = req.params

    if (!id || isNaN(Number(id)))
        return res.status(400).json({ error: 'Provide valid id' })

    const seat = await db.seat.findFirst({
        where: { id: Number(id) },
        include: { seatClass: { include: { _count: true } } }
    })

    if (!seat)
        return res.status(404).json({ error: 'Seat not found' })

    const totalCount = Number(seat.seatClass._count)
    const bookedCount = await db.seat.count({
        where: {
            seat_class: seat.seat_class,
            bookingId: { not: null }
        }
    })

    const { seatClass, ...data } = seat

    let price: number | null = null

    if (bookedCount < 0.4 * totalCount)
        price = seatClass.min_price || seatClass.normal_price
            || seatClass.max_price
    else if (bookedCount < 0.6 * totalCount)
        price = seatClass.normal_price || seatClass.max_price
    else
        price = seatClass.max_price

    return res.json({ ...data, price })
}