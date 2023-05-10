const fs = require('fs/promises')
const { PrismaClient } = require('@prisma/client')
const path = require('path')
const prisma = new PrismaClient()

async function main() {
    // delete contents of table
    await prisma.seat.deleteMany()
    await prisma.seatClass.deleteMany()
    await prisma.booking.deleteMany()


    const pricing = await fs.readFile(
        path.join(__dirname + '/SeatPricing.csv'),
        { encoding: 'utf-8' }
    )
    const SeatPricing = parseData(pricing)

    let result = await prisma.seatClass.createMany({
        data: SeatPricing
    })
    console.log('Seat Classes Created: ' + result.count)


    const seats = await fs.readFile(
        path.join(__dirname + '/Seats.csv'),
        { encoding: 'utf-8' }
    )
    const Seats = parseData(seats)

    result = await prisma.seat.createMany({
        data: Seats
    })
    console.log('Seats Created: ' + result.count)
}

main().catch(console.error)

function parseData(data) {
    // crlf to lf
    data = data.replace(/\r\n/g, '\n')
    data = data.replace(/\r/g, '')

    const dataArr = data.split('\n')
    const fieldNames = dataArr.shift().split(',')
    let preparedData = []

    dataArr.forEach(row => {
        let record = {}
        row.split(',').forEach((value, i) => {
            record[fieldNames[i]] = parseValue(value)
        })
        preparedData.push(record)
    })

    return preparedData
}

function parseValue(value) {
    if (!value) return null

    if (!isNaN(value))
        return Number(value)

    if (value.charAt(0) == '$')
        return Number(value.slice(1))

    return value
}