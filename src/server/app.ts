import express from 'express'
import { PresentationRoute } from './routes/PresentationRoute'
import { init } from './database'

const app = express()

app.use(express.json())
app.use('/presentations', PresentationRoute)

init()

export { app }