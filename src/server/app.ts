import express from 'express'
import cors from 'cors'
import { PresentationRoute } from './routes/PresentationRoute'
import { init } from './database'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/presentations', PresentationRoute)

init()

export { app }