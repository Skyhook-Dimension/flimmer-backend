//var mongoose = require('mongoose')
import mongoose from 'mongoose'
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'

var userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }

        this.password = hash
        next()
    })
})



userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

export const User = mongoose.model('User', userSchema)