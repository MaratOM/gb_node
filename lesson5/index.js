const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')

const usersRoutes = require('./routes/users')
const todosRoutes = require('./routes/todos')

const app = express()

app.set('views', path.join(__dirname + '/views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'todos',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

const port = 8000
app.listen(port, () => {
  console.log('Listening on port ' + port)
})

app.use('/todos', todosRoutes)
app.use('/', usersRoutes)
