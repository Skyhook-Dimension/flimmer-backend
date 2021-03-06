const express = require('express')
const useractions = require('../methods/useractions')
const flimactions = require('../methods/flimactions')

const passport = require('passport')
const router = express.Router()
router.get('/', (req, res) => {
    res.send('Hello Chirag')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

router.post('/adduser', useractions.addNew)
router.post('/authenticate', useractions.authenticate)
router.get('/getinfo', useractions.getinfo)
router.get('/fetchflims', flimactions.fetchFlims)
router.post('/addflim', flimactions.addFlim)
router.get('/nexttenflims', passport.authenticate('jwt', { session: false }), flimactions.nextTen)
router.post('/login', useractions.login)

module.exports = router