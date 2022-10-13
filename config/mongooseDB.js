require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        const URI = process.env.MONGODB;
        await mongoose.connect(URI ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect moggoose sucess =>>>>> -_-');
    } catch (error) {
        console.log('connect moggoose error =>>>>>' ,error);
    } 
}

module.exports = {connect}
