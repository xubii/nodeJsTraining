module.exports = (app) => {

    const users = require('../controller/user-controller.js');
    
    //Users
    app.post('/users', users.create);

    app.post('/login', users.logincheck);

    app.get('/users',tokencheck, users.findAll);

    app.get('/users/:user_id', users.findOne);

    app.put('/users/:user_id', users.update);

    app.delete('/users/:user_id', users.delete);

    
}

var jwt = require('jsonwebtoken'); 
var express 	= require('express');
var app         = express();
var config = require('../config/config.js'); 
app.set('superSecret', config.secret); e

const tokencheck = (req, res, next)=> {

    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    
    if (token) {
  
      
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  };