const express = require("express");
require('./db/conn');
const Router=require('./router/auth');
const port = 4000;
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.use(express.urlencoded({extended: false})) ;

app.use(cookieParser());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    );
    next();
})
app.use(express.json());
app.use(Router);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});