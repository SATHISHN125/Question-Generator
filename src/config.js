const mongoose = require("mongoose");
const connect= mongoose.connect("mongodb://127.0.0.1:27017/login-app");

connect.then(()=>{
    console.log("DBb connected");
})
.catch(()=>{
    console.log("DB not connected");
})

const loginschema = new mongoose.Schema({
   name   : {
    type  : String,
    required: true
   },
   password: {
    type  : String,
    required: true
   }
});

const collection = new mongoose.model("users",loginschema)

module.exports= collection;