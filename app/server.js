// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var friendsData = [
    {
    name: "Geese",
    photo: "https://pbs.twimg.com/profile_images/1172879189000818693/w1qr4s8N_400x400.jpg",
    scores: [1,1,2,3,2,3,3,2,5,4]
    },
    {
    name: "JoJo",
    photo: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/140054808/original/03c044e650dc58ddf162255d6d4308fd2a24f81b.jpg",
    scores: [3,4,4,3,4,3,5,4,1,4]   
    },
    {
    name: "Chris",
    photo: "https://ichef.bbci.co.uk/images/ic/704xn/p05lky5z.jpg",
    scores: [2,2,3,4,5,5,4,3,2,1]
    },
    {
    name: "Nick",
    photo: "https://www.denofgeek.com/wp-content/uploads/2013/09/nickfurymain.jpg?fit=800%2C1000",
    scores: [4,5,4,4,5,2,4,1,4,3]
    },
    {
    name: "Tim",
    photo: "https://miro.medium.com/max/1400/0*ak7xmbhCvypBbFjg.",
    scores: [5,4,3,2,1,1,2,3,4,5]
    }
];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Home Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/home.html"));
}); 
// Survey
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/survey.html"));
}); 
//api/friends
app.get("/api/friends", function(req, res) {
    return res.json(friendsData);
}); 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Create New User - takes in JSON input
app.post("/survey", function(req, res) {
    var newUser = req.body;
    var newUserScore = [];
    //coverts the score from string to array
    for (var i = 0; i < newUser.scores.length; i++) {
        var newUserScoreI = parseInt(newUser.scores[i]);
        newUserScore.push(newUserScoreI);
    }
    //constructing a object to push in to friendsData
    var newUserData = {
        name: newUser.name,
        photo: newUser.photo,
        scores: newUserScore
    }
    //push the object in the friends data
    friendsData.push(newUserData);

    var differenceArray = [];

    var currentUserIndex = friendsData.length - 1;

    for (var j = 0; j < currentUserIndex; j++) {
        //take user score and compare it with the user that just submitted their survey
        var totalDifference = 0;

        for( var k = 0; k <9; k++) {
            var difference = Math.abs(friendsData[j].scores[k] - friendsData[currentUserIndex].scores[k]);
            totalDifference = totalDifference + difference;
        }
        // store the totalDifference in differencearray
        differenceArray.push(totalDifference);
    }

    var smallestNum = Math.min(...differenceArray);
    var matchingUserIndex = differenceArray.indexOf(smallestNum);
    var matchedUser = friendsData[matchingUserIndex];

    var newMatchedUser = {
        name: matchedUser.name,
        photo: matchedUser.photo
    }
    res.json(newMatchedUser);
    console.log(newMatchedUser);
})

