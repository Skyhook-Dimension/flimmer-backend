const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
router.get('/', (req, res) => {
    res.send('Hello Chirag')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

router.post('/adduser', actions.addNew)
router.post('/authenticate', actions.authenticate)
router.get('/getinfo', actions.getinfo)
module.exports = router