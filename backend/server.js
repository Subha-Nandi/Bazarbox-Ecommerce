const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();


const app = require("./src/app");
const connectDB = require("./src/db/db")

connectDB();


app.listen(3000, () => {
 console.log('serevr is running in port 3000')
});


// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//     console.log('Request received');
//     res.send('Server is working!');
// });

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });


