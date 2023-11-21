const mongoose = require('mongoose')
require('dotenv').config() 

const connectDb = async()=>{
   mongoose.connect(process.env.DB_URL).
    then(()=>{
        console.log('connection  dataBase')
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports = connectDb;