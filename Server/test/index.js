const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017")
.then(()=>{console.log("Database Connected");
console.log("Sucessfully connected to MongoDB");
}).catch(err=>{
console.log(err);
console.log("Could not connect to MongoDB");
})

