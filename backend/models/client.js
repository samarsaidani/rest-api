const mongoose= require('mongoose')

// creation de schema 
const clientSchema = new mongoose.Schema({
    nom:String,
    email:String,
    age:Number
})


module.exports = mongoose.model('User',clientSchema)