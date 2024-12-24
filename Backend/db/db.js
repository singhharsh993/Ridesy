const mongoose = require('mongoose');
require('dotenv').config();
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT,
    ).then(() => {
            console.log('connected to db');
        })
        .catch(err => console.log(err));
}

module.exports= connectToDb;
// taskkill /PID 19512 /F
//netstat -ano | findstr :4000
