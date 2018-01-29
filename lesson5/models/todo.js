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

todoSchema.statics.getAllTodos = async function() {
  try {
    return await Todo.find()
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.methods.addTodo = async function(todo) {
  try {
    await this.set(todo).save()
    return 'Todo item added!'
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.methods.updateTodo = async function(id, todoNewData) {
  try {
    const todo = await this.model('todo').findById(id)

    if(todo) {
      await todo.set(todoNewData).save()
      return `Todo updated!`
    }
    else {
      return 'No such todo!'
    }
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.methods.todoToggleCompleted = async function(id) {
  try {
    const todo = await this.model('todo').findById(id)

    if(todo) {
      await todo.set({completed: !todo.completed}).save()
      return `Todo completed set to ${todo.completed}`
    }
    else {
      return 'No such todo!'
    }
  } catch(error) {
    throw new Error(error)
  }
}

todoSchema.methods.deleteTodo = async function(id) {
  try {
    const todo = await this.model('todo').findById(id)

    if(todo) {
      await this.model('todo').remove(todo)
      return 'Todo deleted!'
    }
    else {
      return 'No such todo!'
    }
  } catch(error) {
    throw new Error(error)
  }
}

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo
