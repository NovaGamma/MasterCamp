'use strict';
import * as userHandlers from '../controllers/authController.js'
import * as communeHandlers from '../controllers/communeController.js'
import * as candidatHandlers from '../controllers/candidatController.js'
import * as voteHandlers from '../controllers/voteController.js'


export function route(app) {
  
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
    .post(userHandlers.loginRequired, voteHandlers.vote); //login

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
    .post(userHandlers.remove); //admin

  // post request for user log in
  app.route("/auth/login")
   .post(userHandlers.signIn);
} 
