const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/todos')

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

todoSchema.statics.addTodo = async function(todoData) {
  try {
    const todo = new Todo(todoData)
    await todo.save()
    return 'Todo item added!'
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.statics.updateTodo = async function(id, todoNewData) {
  try {
    const todo = await this.findById(id)

    if(todo) {
      await todo.update(todoNewData)
      return `Todo updated!`
    }
    else {
      return 'No such todo!'
    }
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.statics.todoToggleCompleted = async function(id) {
  try {
    const todo = await Todo.findById(id)

    if(todo) {
      await todo.update({completed: !todo.completed})
      return `Todo completed set to ${todo.completed}`
    }
    else {
      return 'No such todo!'
    }
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.statics.deleteTodo = async function(id) {
  try {
    let message = ''
    const result = await this.remove({_id: id})

    if(result.ok === 1 && result.n === 1) {
       message = 'Todo deleted!'
    }
    else {
      message = 'No such todo!'
    }

    return message
  } catch(error) {
    throw new Error(error)
  }
}

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
