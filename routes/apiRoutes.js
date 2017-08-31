// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
var totalDifference = 0;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
      var match = {
        name: "",
        image: "",
        matchDifference: 1000
      };
      var userData = req.body;
      var userName = userData.name;
      var userImage = userData.image;
      var userScores = userData.scores;
      var totalDifference = 0;

      for(var i = 0; i < friends.length-1; i++) {
        console.log(friends[i].name);
        totalDifference = 0;

        // loop thru friends and users scores to calculate the absolute difference and push the result to the match variable
        for(var j = 0; j < 10; j++) {
            // calculates the difference
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            // if overall difference is less than current greatMatch
            if (totalDifference <= match.matchDifference) {
                // reset match
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.matchDifference = totalDifference;
            if (j == 9) {
            console.log(friends[i].name + " difference is:" + totalDifference)
            }
            }
        }
    }

      friends.push(userData);
      res.json(match);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friends = [];
    console.log(friends);
  });
};