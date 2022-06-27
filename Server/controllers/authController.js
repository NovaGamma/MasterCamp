const User = require("../models/userModel");

const config = require("../config/auth.config")

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


exports.register = (req, res) => {
  let newUser = new User(req.body);
  bcrypt.genSalt(10)
    .then(salt => {
      newUser.hash_password = bcrypt.hash(req.body.password, salt);
      newUser.role = "user";
      newUser.save((err, user) => {
        if(err){
          res.status(500).send({message: err});
        }
        user.hash_password = undefined;
        res.status(201).json(user);
      })
    });
}

exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email},
    (err, user) => {
      if (err) throw err;
      if(!user){
        res.status(401).json({message: 'Authentification failed. User not found'});
      } else if (user){
          if(!user.comparePassword(req.body.password)){
            res.status(401).json({message: 'Authentification failed. Wrong password'});
          } else {
            res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id, role: user.role}, config.secret, {expiresIn: 86400})
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