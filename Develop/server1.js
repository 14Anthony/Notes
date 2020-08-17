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