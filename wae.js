const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5400

const pageRoutes = require('./routes/page')
const apiRoutes = require('./routes/api')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', pageRoutes)
app.use('/api', apiRoutes)

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
