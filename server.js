require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Sử dụng để khắc phục lỗi cors bên frontend 
const bodyParser = require("body-parser"); // Sử dụng để tránh trường hợp nhập form trả về => không thấy req.body
const cookieParser = require('cookie-parser'); //Thiết lập gói cookie-parser => sử dụng cookie
const Router = require('./routes/router');
const MongDB = require('./config/mongooseDB');

MongDB.connect();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

Router(app);


const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`server running ${port}` );
})