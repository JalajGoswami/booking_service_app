import express, { Express } from 'express'
import dotenv from 'dotenv'
import db from './prisma/db'
import router from './routes'

dotenv.config()

const PORT = process.env.PORT ?? 5000

const app: Express = express()

async function main() {

    // body parsers
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))


    // router setup
    app.use('/', router)


    app.listen(PORT, () =>
        console.log(`⚡️ Server running on http://localhost:${PORT}`)
    )
}

main()
    .catch((err) =>
        console.error(err)
    )
    .finally(() =>
        db.$disconnect()
    )