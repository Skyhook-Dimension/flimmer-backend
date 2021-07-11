//const mongoose = require('mongoose')
import mongoose from 'mongoose'
//const dbconfig = require('./dbconfig')
import config from './dbconfig.js'
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(config.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true


        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

}
export default connectDB