const mongoose = require('mongoose');

async function connetDB(){
   
    try{
       await  mongoose.connect(process.env.DB_URI);
       console.log("Database connected seccessfully");
    }catch(err){
        console.log("database connection failed : ",err);
         setTimeout(connectDB, 5000);
    }
}

module.exports = connetDB