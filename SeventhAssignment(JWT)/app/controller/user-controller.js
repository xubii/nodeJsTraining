const db = require('../models/index.js');
const User = db.user;
var jwt = require('jsonwebtoken'); 
var express = require('express');
var app = express();
var config = require('../config/config.js'); 
app.set('superSecret', config.secret);
var Sequelize = require('sequelize');
const sequelize = new Sequelize('jwt-database', 'root', 'root', {
    dialect: 'postgres'
  });

exports.create = (req, res) => {
    const {
        first_name,
        last_name,
        number,
        email,
        password: password,
    } = req.body;
    User.create({
        first_name: first_name,
        last_name: last_name,
        number: number,
        email: email,
        password: password,
    })
        .then(data => res.status(201).json({
            message: 'New User has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

exports.findAll = (req, res) => {
    User.findAll({})
        .then(user => res.json({
            data: user,
            message: 'You got the details of All Users'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

exports.findOne = (req, res) => {
    //Get One User using ID
    const user_id = req.params.user_id;
    User.findOne({
        where: {
            user_id: user_id
        }
    }, )
        .then(user => res.status(201).json({
            data: user,
            message: 'You Got the User detail with Id:' + user_id
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

exports.update = (req, res) => {
    const user_id = req.params.user_id;
    const { first_name, last_name, number, email, password } = req.body;
    User.update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        number: number,
        password: password,
    }, {
            where: {
                user_id: user_id
            }
        })
        .then(user => res.status(201).json({
            message: 'User has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};


exports.delete = (req, res) => {
    const user_id = req.params.user_id;

    User.destroy({
        where: {
            user_id: user_id
        }
    })
        .then(status => res.status(201).json({
            message: 'User has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

exports.getage = (req, res) => {
    sequelize.query('SELECT * FROM users WHERE age>' + req.params.age, { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            res.json({
                data: users,
                message: 'You got the details of All Users'
            })
        })
};


exports.logincheck = (req, res) => {

const email = req.body.email;
const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
     }).then((user) => {

        if(user){

            user.comparePassword(password, (error, response) => {
                if(error) return res.status(401).json(handleUnAuthorizedError);

                if(response) {
                    const payload = {
                        email: email
                    };
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: '24h' // expires in 24 hours
                    });
        
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                } else {
                    return res.status(401).json(handleUnAuthorizedError);
                }

            });
        } else {
            res.status(401).json(handleUnAuthorizedError);
        };

    }).catch((error) => res.status(401).json(handleUnAuthorizedError));
};

let handleUnAuthorizedError = {
    success: false,
    message: 'UnAuthorized',
    token: null
}