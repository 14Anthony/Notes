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
