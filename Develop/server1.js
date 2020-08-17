const express = require("express");
const path = require("path");
const fs = require("fs");
const dbjson = require("./db/db.json")
// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// Displays all notes
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        return res.json(JSON.parse(data));
    });
});
// Displays a single Note, or returns false
app.get("/api/notes/:id", function (req, res) {
    const choose = req.params.id;
    console.log(choose);
    for (let i = 0; i < dbjson.length; i++) {
        if (choose == dbjson[i].id) {
            return res.json(dbjson[i]);
        }
    }
    return res.json(false);
});
// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    e
    const newNote = req.body;
    newNote.id = Date.now()
    console.log(newNote);
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let notes = JSON.parse(data)
        notes.push(newNote);
        let notesString = JSON.stringify(notes);
        fs.writeFile('./db/db.json', notesString, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
            res.json(newNote);
        })
        console.log(data);
    });

});
app.delete("/api/notes/:id", function (req, res) {
    const choose = req.params.id;
    console.log(choose);
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let notes = JSON.parse(data)
        const keep = [];
        for (let i = 0; i < notes.length; i++) {
            if (choose != notes[i].id) {
                keep.push(notes[i]);

            }
        }
        let keepers = JSON.stringify(keep);


        fs.writeFile('./db/db.json', keepers, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
            res.json(keepers);
        })
        console.log(data);
    });

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
