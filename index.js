//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//port
const app = express();
const PORT = 3001;

//app use functions
app.use(express.json());
//connects to the static files in the public folder
app.use(express.static("public"));


//routes
 app.get("/api/notes", (req, res) => {
     fs.readFile("db/db.json", "utf8", function (err, data){
         if (err){
             console.log(err);
             return;
         } res.json(notes)
     })
 });


 //server 
 app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);