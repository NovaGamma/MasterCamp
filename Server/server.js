import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'


mongoose.Promise = global.Promise;
import {auth} from './config.js'
const mongoUri = auth.mongoUri

mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{console.log("Database Connected");
             console.log("Sucessfully connected to MongoDB");
           }).catch(err=>{
             console.log(err);
             console.log("Could not connect to MongoDB");
           })


var corsOptions = {
  origin: ["http://localhost:8080","http://127.0.0.1:8080", "http://localhost:8081"]
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], auth.secret, (err, decode) => {
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

import {route} from './routes/routes.js'
route(app);
app.get("/", (req, res) => {
  res.json({message: "Server lives!!!"});
});

app.listen(5000, () => {
  console.log("Server has started!")
})
