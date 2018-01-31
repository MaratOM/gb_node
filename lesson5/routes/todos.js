const express = require('express');
const router = express.Router();

const Todo = require('../models/todo')
const auth = require('../passport')
const errorMsg = require('../constants/error')

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find()
  res.send(todos)
})

router.post('/', auth, async (req, res) => {
  try {
    const message = await Todo.addTodo(req.body)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send(errorMsg.GENERIC_ERROR_MESSAGE)
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const message = await Todo.updateTodo(req.params.id, req.body)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send(errorMsg.GENERIC_ERROR_MESSAGE)
  }
})

router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const message = await Todo.todoToggleCompleted(req.params.id)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send(errorMsg.GENERIC_ERROR_MESSAGE)
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Todo.deleteTodo(req.params.id)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send(errorMsg.GENERIC_ERROR_MESSAGE)
  }
})

module.exports = router
