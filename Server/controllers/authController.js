import {User} from "../models/userModel.js";
import {send_mail, get_html_validation} from "./mailController.js"
import {auth} from "../config.js"

import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs'


var register = async (req, res) => {
  let newUser = new User({...req.body});
  let salt = await bcrypt.genSalt(10)
  newUser.hash_password = await bcrypt.hash(req.body.password, salt)
  newUser.save((err, user) => {
    if(err){
      return res.status(500).send({message: err});
    }
    user.hash_password = undefined;
    return res.status(201).json(user);
  })
}

var validate = (req, res) => {
  User.findOne({
    email: req.body.email,
    voterID: req.body.voterID
  })
  .then((user)=> {
    if(!user){
      return res.status(500).json({message: 'Error, user not found'})
    }
    if(user.validated){
      return res.status(500).json({message: 'Error, account already activated'})
    }
    user.validated = true;
    user.save();
    let html = get_html_validation(user)
    //send_mail(user, "Validation compte Votons Tous", html)
    return res.status(200)
  })
}

var signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
    voterID: req.body.voterID
      },
    (err, user) => {
      if (err) throw err;
      if(!user){
        return res.status(401).json({message: 'Authentification failed. User not found'});
      } else if (user){
          if(!user.comparePassword(req.body.password)){
            return res.status(401).json({message: 'Authentification failed. Wrong password'});
          } else {
            return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, voterID: user.voterID, _id: user._id, communeID:user.commune, hasVoted:user.hasVoted}, auth.secret, {expiresIn: 86400})
          });
        }
      }
    });
}

var refresh_token = (req, res) => {
  User.findOne({_id:req.user._id})
  .then(user => {
    return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, voterID: user.voterID, _id: user._id, communeID:user.commune, hasVoted:user.hasVoted}, auth.secret, {expiresIn: 86400})})
  })
}

var loginRequired = (req, res, next) => {
  if(req.user){
    next()
  } else {
    res.status(401).json({message: 'Unauthorized user'});
  }
}

// FIND a user
var findOne = (req, res) => {
    User.findById(req.body.userId)
    .then(question => {
        if(!question) {
            return res.status(500).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(500).send({
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
var remove = (req, res) => {
  User.findByIdAndRemove(req.body.userId)
  .then(user => {
      if(!user) {
          return res.status(500).send({
              message: "User not found with id " +
              req.body.userId
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(500).send({
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

var findAll = (req, res) => {
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
var findByCommune = (req, res) => {
    User.find({ communeID: req.body.communeID})
    .then(
    votes => {
        res.send(votes)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
}

export {register, signIn, loginRequired, findOne, remove, findAll, findByCommune, validate, refresh_token};