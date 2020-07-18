const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Author',authorSchema)