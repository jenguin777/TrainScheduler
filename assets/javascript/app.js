// Initialize Firebase
var config = {
    apiKey: "AIzaSyALppos2MnyJCWdKNQ8-CnaMMNKTry7eMg",
    authDomain: "train-scheduler-84b57.firebaseapp.com",
    databaseURL: "https://train-scheduler-84b57.firebaseio.com",
    projectId: "train-scheduler-84b57",
    storageBucket: "",
  };
  
// This is passing in our firebase config information  
firebase.initializeApp(config);

// VARIABLES
// --------------------------------------------------------------------------------
// ***Firebase variables***

// put firebase database into a variable called db
var db = firebase.database();

// create TrainScheduler folder in firebase database, then store in a variable called trainData
var trainData = db.ref("/TrainScheduler");

// ***Program variables***

// trainScheduler contains a list of trains, each train having a list of attributes
// train is the variable for one train
var train = "";

// now for the train attribute variables
// Name of train
var trainName = "";
// Destination
var destination = "";
// Should this be data type string???
var firstTrainTime = "";
// frequency train runs, in minutes
var frequency = 0;

// FUNCTIONS
// --------------------------------------------------------------------------------

// Function to fetch the train data from the firebase database and write it to the #schedule-section
function appendTrain(train) {

  console.log("train " + JSON.stringify(train));

  var tr = $("<tr>");

  var tdName = $("<td>");
  tdName.text(train.val().nameData);
  
  var tdDestination = $("<td>");
  tdDestination.text(train.val().destinationData);

  var tdFrequency = $("<td>");
  tdFrequency.text(train.val().frequencyData);
  
  tr.append(tdName).append(tdDestination).append(tdFrequency);

  $("#schedule-section").append(tr);

  // Call function nextArrival() to calculate train's nextArrival
  //nextArrival();

  // Call function minutesAway() to calculate minutes until the next train arrives
  
}

// Function to display current time
function currentTime() {
  var now = moment().format("HH:mm");
  console.log("now" + now);
  $("#current-time").text("Current Time: " + now);
}

// Function to calculate the train's next arrival time, then append it to each train row
function nextArrival() {
  var now = moment().format("HH:mm");
  console.log("now" + now);
  
}

// Calculate how many minutes from now until the next train arrives, then appent it to each train row
// function minutesAway() {

// }

// BODY
// --------------------------------------------------------------------------------

// Firebase watcher + initial loader for the subsequent submits
trainData.on("child_added", function(childsnapshot) {
  console.log(childsnapshot.val());

  // Log everything that's coming out of childsnapshot
  console.log(childsnapshot.val().nameData);
  console.log(childsnapshot.val().destinationData);
  console.log(childsnapshot.val().firstTrainTimeData);
  console.log(childsnapshot.val().frequencyData);

  // Call currentTime() to display the current time in #current-time
  currentTime();

  // Call appendTrain() to write results to #schedule-section
  appendTrain(childsnapshot);

}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  
// Handling the add-train Submit button clicks
$("#add-train").on("click", function(event) {
  event.preventDefault();
      
  // Read the data from the form fields
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = $("#first-train-time-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  
  // Store the data entered into the firebase database
  trainData.push({
      nameData: trainName,
      destinationData: destination,
      firstTrainTimeData:firstTrainTime,
      frequencyData: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  // --------------------------------------------------------------