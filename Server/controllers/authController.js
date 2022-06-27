const User = require("../models/userModel");
const Commune = require("../models/communeModel");

const config = require("../config/auth.config");

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  let newUser = new User({...req.body});
  let salt = await bcrypt.genSalt(10)
  newUser.hash_password = await bcrypt.hash(req.body.password, salt)
  newUser.save((err, user) => {
    if(err){
      res.status(500).send({message: err});
    }
    user.hash_password = undefined;
    res.status(201).json(user);
  })
}

exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
      voterID: req.body.voterID
      },
    (err, user) => {
      if (err) throw err;
      if(!user){
        res.status(401).json({message: 'Authentification failed. User not found'});
      } else if (user){
          if(!user.comparePassword(req.body.password)){
            res.status(401).json({message: 'Authentification failed. Wrong password'});
          } else {
            res.json({token: jwt.sign({email: user.email, fullName: user.fullName, voterID: user.voterID, _id: user._id, communeID:user.commune}, config.secret, {expiresIn: 86400})
          });
        }
      }
    });
}

exports.loginRequired = (req, res, next) => {
  if(req.user){
    next()
  } else {
    res.status(401).json({message: 'Unauthorized user'});
  }
}

// FIND a user
exports.findOne = (req, res) => {
    User.findById(req.body.userId)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " +
            req.body.userId
        });
    });
};

// DELETE a User
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.body.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " +
              req.body.userId
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " +
              req.body.userId
          });
      }
      return res.status(500).send({
          message: "Could not delete User with id " +
          req.body.userId
      });
  });
}

exports.findAll = (req, res) => {
  User.find()
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};

// find user by commune
exports.findByCommune = (req, res) => {
    User.find({ communeID: req.body.communeID})
    .then(
    votes => {
        res.send(votes)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
}