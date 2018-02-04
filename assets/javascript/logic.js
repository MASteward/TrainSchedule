var config = {
  apiKey: "AIzaSyDrePnJI6zVPAix0eAE-w5kC2C8cLZj2To",
  authDomain: "trainschedule-e1062.firebaseapp.com",
  databaseURL: "https://trainschedule-e1062.firebaseio.com",
  projectId: "trainschedule-e1062",
  storageBucket: "trainschedule-e1062.appspot.com",
  messagingSenderId: "788633477827"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding train schedule
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var railLine = $("#railLine-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startTime = moment($("#startTime-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    railLine: railLine,
    destination: destination,
    startTime: startTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.railLine);
  // console.log(newTrain.destination);
  // console.log(newTrain.startTime);
  // console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#railLine-input").val("");
  $("#destination-input").val("");
  $("#startTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var railLine = childSnapshot.val().railLine;
  var destination = childSnapshot.val().destination;
  var startTime = childSnapshot.val().startTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(railLine);
  console.log(destination);
  console.log(startTime);
  console.log(frequency);


  var formatTime = moment.unix(startTime).format("h:mma");
  console.log("formatTime: ", formatTime);


  var timeDiff = moment().diff(moment.unix(startTime, "X"), "minutes");
  console.log("timeDiff: ", timeDiff);
  
  var remainder = timeDiff % frequency;
  console.log("remainder: ", remainder);
  
  var waitTime = frequency - remainder;
  console.log("waitTime: ", waitTime);

  var nextArrival = moment().add(waitTime, "minutes").format("h:mma");
  console.log("nextArrival: ", nextArrival);


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + railLine + "</td><td class='tableBody'>" + destination + "</td><td class='tableBody'>" + frequency + "</td><td class='tableBody'>" + nextArrival + "</td><td class='tableBody'>" + waitTime + "</td></tr>");
});


