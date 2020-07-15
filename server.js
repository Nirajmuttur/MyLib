if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

app.set('view engine','ejs')              //view engine
app.set('views',__dirname + '/views')    //view directory
app.set('layout','layouts/layout')          //layouts for html boilerplate
app.use(expressLayouts)
app.use(express.static('public'))       

                

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true })           //database
const db = mongoose.connection
db.on('error',error => console.error(error)) 
db.once('open', () => console.log('Connected to mongoDB')) 

app.use('/',indexRouter)    //routes

app.listen(process.env.PORT || 3000)