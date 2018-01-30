const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Todo = require('./models/todo')

app.use(bodyParser.urlencoded({ extended: true }))

const port = 8000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})

app.get('/',  async (req, res) => {
  res.redirect('/todos')
})

app.get('/todos',  async (req, res) => {
  const todos = await Todo.find()
  res.send(todos)
})

app.post('/todos',  async (req, res) => {
  try {
    const message = await new Todo().addTodo(req.body)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send('Something went wrong!')
  }
})

app.put('/todos/:id',  async (req, res) => {
  try {
    const message = await new Todo().updateTodo(req.params.id, req.body)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send('Something went wrong!')
  }
})

app.patch('/todos/:id/complete',  async (req, res) => {
  try {
    const message = await new Todo().todoToggleCompleted(req.params.id)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send('Something went wrong!')
  }
})

app.delete('/todos/:id',  async (req, res) => {
  try {
    const message = await new Todo().deleteTodo(req.params.id)
    res.send(message)
  }
  catch(err) {
    console.log(err)
    res.send('Something went wrong!')
  }
})
