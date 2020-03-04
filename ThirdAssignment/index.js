const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser'); 
const app = express();
const BEARER = "Bearer";
const TOKEN = "123456789";


// request interceptor, Intercept every request
// Here this can be mount any specific request app.use('getAll', function (req, res, next){});
app.use(function (req, res, next) {

    if(req.headers.authorization != null){
        const auth =  req.headers.authorization;
        const bearer = auth.substring(0, 6);
        const token = auth.substring(7);
        
        if(bearer === BEARER && token === TOKEN){
            next()
        }else{
            res.status(401).send({ error: "Not a valid user" });
        }

    }
    
});
app.use(bodyParser.json()); 
app.use('/book', require('./book.routes'))
app.listen(4200, () => console.log("Server started at port 4200"));