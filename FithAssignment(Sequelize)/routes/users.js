const router = require('express').Router();
const models = require('../models');
const Users = models.Users;

/* GET users listing. */
router.get('/', function(req, res, next) {
    Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
});

router.post('/save' , function(req, res){
       // Validate request
        if (!req.body.name) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
      
        // Create a User
        const user = {
          name : req.body.name,
          age : req.body.age,
          address : req.body.address,
          bio : req.body.address,
          role_id: req.body.role_id
        };

        // Save User in the database
        Users.create(user)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user ."
            });
          });
});

router.get('/:id' , function(req, res) {
    const id = req.params.id;
  
    Users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  });
  
  router.put('/update/:id', function (req, res) {
    const id = req.params.id;
  
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  });


  router.delete('/delete/:id' , function(req, res)  {
    const id = req.params.id;
  
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  });
  
  
module.exports = router;