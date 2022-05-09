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
app.use(express.urlencoded({extended: true}));
let notes = require("./db/db.json");
//not sure how this was added
const { addAbortSignal } = require("stream");

//routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//to display notes
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
  console.log(`App listening at http://localhost:${PORT}`)
);

//to do create note post
app.post("/api/notes", (req, res) => {
var letters = String.fromCharCode(65 + Math.floor(Math.random() * 26));
var id = letters + Date.now();

let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
};
notes.push(newNote);
//create jsonstringify into var
const stringifyNotes = JSON.stringify(notes);
res.json(notes);
fs.writeFile("db/db.json", stringifyNotes, (err) => {
    if (err) console.log(err);
    else {
        console.log("Success");
    }
});
});

//catch error route
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "public/index.html"))
})

//to do bonus delete note