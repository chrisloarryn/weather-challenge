import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xssAdvanced from 'xss-advanced'
import weatherRoutes from './routes/weather.routes'
import compression from 'compression'
const responseTime = require('response-time')

import AppError from './utils/appError'


const app = express()

// settings
app.set('port', process.env.PORT || 3_000)

// Global middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(responseTime())

// Set security HTTP headers
app.use(helmet())

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour to milliseconds
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
// // { "email": { "$gt": ""}, "password": "pass1234" }
app.use(mongoSanitize())

// Data sanitization against XXS (cross site scripting attacks)
app.use(xssAdvanced())
app.use(compression())

// Test middleware
// app.use((req, res, next) => {
//   ping()(req, res, next)
// })

app.get('/', (req: Request, res: Response) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`)
})

app.use('/api/v1/weather', weatherRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// app.use(specialRoutes)

export default app
