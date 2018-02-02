const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user')
const auth = require('../passport')
const errorMsg = require('../constants/error')

router.get('/', async (req, res) => {
  res.redirect('/login')
})

router.get('/login', async (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/todos',
  failureRedirect: '/login',
}))

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/todos',
  failureRedirect: '/login',
}))

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.send('User added!')
  }
  catch(err) {
    console.log(err)
    res.send(errorMsg.GENERIC_ERROR_MESSAGE)
  }
})

module.exports = router
