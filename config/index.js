const mongoose = require("mongoose");
const dotenv = require('dotenv')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB connected: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error ${error.message}`)
    }
}

module.exports = connectDB