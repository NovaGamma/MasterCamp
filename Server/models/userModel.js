'use strict';

import mongoose from "mongoose"

import bcrypt from "bcryptjs"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true
  },
  voterID: {
    type: String, //8-9 characters (digits)
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique:true,
    lowercase:true,
    trim:true,
    required:true
  },
  commune: {
    type: mongoose.ObjectId,
    require: true
  },
  hash_password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  hasVoted: {
    type: Boolean,
    default: false
  }

});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.hash_password);
}

let User = mongoose.model("User", UserSchema);

export {User};
