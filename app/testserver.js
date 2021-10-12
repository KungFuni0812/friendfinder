var differenceArray = [];

var usersArray = [
    {
        name: "Mike",
        scores: [1,1,2,3,2,3,3,2,5,4]
    },
    {
        name: "Chris",
        scores: [2,2,3,4,5,5,4,3,2,1]
    },
    {
        name: "Tim",
        scores: [5,4,3,2,1,1,2,3,4,5]
    },
    {
        name: "Joe",
        scores: [3,4,4,3,4,3,5,4,1,4]
    },
    {
        name: "Nick",
        scores: [4,5,4,4,5,2,4,1,4,3]
    },
    {
        name: "New Survey Person",
        scores: [3,3,3,3,5,3,3,4,5,4]
    },
    {
        name: "Newer Person",
        scores: [1,3,2,4,2,3,4,2,1,4]
    }
]

// Pretend that user5 ("New Survey Person") is the user that just submitted the survey.  they have to compare to all the other users, so we have to do array.length - 1.  if we do array.length, then the last loop will be checking the person who submitted the survey against themselves
var currentUserIndex = usersArray.length - 1;

for (var i = 0; i < currentUserIndex; i++) {
    console.log(`Evaluating User ${i} - ${usersArray[i].name}`);

    //take user score and compare it with the user that just submitted their survey
    var totalDifference = 0;

    //take the difference between the 2 number and store it in total difference *NOTICE THAT I CHANGED THIS FROM WHAT YOU HAD LAST NIGHT*
    for (var j = 0; j<9; j++) {
        var difference = Math.abs(usersArray[i].scores[j] - usersArray[currentUserIndex].scores[j]);
        totalDifference = totalDifference + difference;
    }
    console.log(`Total difference from current User - ${totalDifference}`);
    // store the totalDifference in differencearray
    differenceArray.push(totalDifference);
    console.log(`~~~~~~~~~~~~~~~~~~~~~`);
}

// now that we have evaluated all of the differences, we are going to see which array index has the lowest number.  the index of the lowest number in the differenceArray will match the index of the user object in the usersArray.  That's how we find our match.

// there a lot of ways we can find the lowest number in an array of numbers.  I'm going to show you a thing built into javascript that can do this, but I would like for you to try and do this a different way on your own, since I did this work for you.  All part of the learning process <3

// The ... before the array variable is something in "new" Javascript (ES6) called the spread operator.  It takes an array and splits it out into a bunch of comma separated values.  So Math.min is looking at every number in the array for the smallest one.

var smallestNum = Math.min(...differenceArray);
console.log(`The smallest number in the array is ${smallestNum}`);
// Now we need to find out what index that smallestNum is in the differenceArray
var matchingUserIndex = differenceArray.indexOf(smallestNum);
console.log(`This number is located at index ${matchingUserIndex}`);
// Now that we know that index, we can select the user that matches.  This object should hopefully have their profile pic and name stored in it, so we can get that name and profile pic and send it back to the frontend.  Mission complete!
var matchedUser = usersArray[matchingUserIndex];

// Console logging the matchedUser's name:
console.log(`Match found!  The closest match to "New Survey Person" is ${matchedUser.name}!`);
