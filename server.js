import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import connectDB from './config/db.js'
import { signin, signup, protect } from './utils/auth.js'
import flimRouter from './resources/flim/flim.router.js'
import userRouter from './resources/user/user.router.js'
import scriptRouter from './resources/script/script.router.js'

const app = express()

if (process.env.NODE_ENV === `development`) {
    app.use(morgan('dev'))
}


app.disable('x-powered-by')
app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/flim', flimRouter)

const PORT = process.env.PORT || 3000

try {
    await connectDB()
    app.listen(PORT, console.log(`Server running in ${ process.env.NODE_ENV }mode on port ${ PORT }`))

} catch (error) {
    console.error(error)

}