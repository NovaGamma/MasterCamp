'use strict';

module.exports = function(app) {
  let userHandlers = require('../controllers/authController');
  let communeHandlers = require('../controllers/communeController');
  let candidatHandlers = require('../controllers/candidatController')
  let voteHandlers = require('../controllers/voteController')

  app.route("/commune/create")
    .post(communeHandlers.create); //admin

  app.route("/commune/findAll")
    .get(communeHandlers.findAll); //admin

  app.route("/commune/find")
    .post(communeHandlers.findOne); //login

  app.route("/candidat/create")
    .post(candidatHandlers.create); //admin

  app.route("/candidat/find")
    .post(candidatHandlers.findByCommune); //login

  app.route("/candidat/findAll")
    .get(candidatHandlers.findAll); //admin
   //app.route("/api/delete_comments")
   //  .post(userHandlers.loginRequired, commentsList.deleteAll); // update with login handler
   //app.route("/api/comments_by_name")
   //  .get(commentsList.findByName); // update with login handler

  app.route("/vote/vote")
    .post(voteHandlers.vote); //login

  app.route("/vote/findAllCommune")
    .get(voteHandlers.findByCommune); //admin

  app.route("/vote/findCandidat")
    .get(voteHandlers.findByCandidat); //admin

  // post request for user registration
  app.route("/auth/register")
   .post(userHandlers.register);

  app.route("/auth/findAll")
    .get(userHandlers.findAll); //admin

  app.route("/auth/delete")
    .post(userHandlers.delete); //admin

  // post request for user log in
  app.route("/auth/login")
   .post(userHandlers.signIn);
} 
