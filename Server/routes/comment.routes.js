'use strict';

module.exports = function(app) {
  let userHandlers = require('../controllers/authController');
  let communeHandlers = require('../controllers/communeController');

  app.route("/commune/create")
    .post(communeHandlers.create);

  app.route("/commune/findAll")
    .get(communeHandlers.findAll);

   //app.route("/api/delete_comments")
   //  .post(userHandlers.loginRequired, commentsList.deleteAll); // update with login handler
   //app.route("/api/comments_by_name")
   //  .get(commentsList.findByName); // update with login handler


 // rest of request defined in Routes politics

  // post request for user registration
  app.route("/auth/register")
   .post(userHandlers.register);

  app.route("/auth/findAll")
    .get(userHandlers.findAll);

  app.route("/auth/delete")
    .post(userHandlers.delete);

  // post request for user log in
  app.route("/auth/login")
   .post(userHandlers.signIn);
} 
