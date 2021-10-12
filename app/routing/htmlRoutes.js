var express = require("express");
var path = require("path");
var router = express.Router()

//Home Page
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/home.html"));
}); 
// Survey
router.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/survey.html"));
}); 


module.exports = router;