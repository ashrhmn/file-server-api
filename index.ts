import express from 'express'
import router from './routes'
import cors from 'cors'

const app = express()

app.use(cors({ origin: '*' }))

app.use(router)

app.listen(4000)
