import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import routes from './routes'
import AppError from './errors/AppError'

const PORT = 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            })
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error!'
        })
    }
)

app.listen(PORT, () => {
    console.log('> Server started on port 3000 👌')
})