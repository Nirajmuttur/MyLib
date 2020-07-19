if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine','ejs')              //view engine
app.set('views',__dirname + '/views')    //view directory
app.set('layout','layouts/layout')          //layouts for html boilerplate
app.use(expressLayouts)
app.use(express.static('public'))       
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOverride('_method'))
                

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true })           //database
const db = mongoose.connection
db.on('error',error => console.error(error)) 
db.once('open', () => console.log('Connected to mongoDB')) 

app.use('/',indexRouter)
app.use('/authors',authorRouter)    //routes
app.use('/books',bookRouter)    //routes


app.listen(process.env.PORT || 3000)