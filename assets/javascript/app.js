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

// Adding this because trainData is stored as list of lists, i.e., array
var allTrains = [];

// VARIABLES
// --------------------------------------------------------------------------------
// put your firebase database into a variable called trainData
var db = firebase.database();
var trainData = db.ref("/TrainScheduler");

// Initial values for our actual variables
// Name of train
var trainName = "";
// Destination
var destination = "";
// Should this be data type string???
var firstTrainTime = "";
// frequency train runs, in minutes
var frequency = 0;

// Handling the add train Submit button clicks
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

  // Fetch the train data from the firebase database and write it to the #schedule-section
  function appendTrain(trainData) {
    
    for (var i = 0; i < trainData.length; i++) {

    var tr = $("<tr>");

    var tdName = $("<td>");
    tdName.text(trainData.nameData);
    console.log("tdName " + JSON.stringify(tdName));

    var tdDestination = $("<td>");
    tdDestination.text(trainData.destinationData);
    console.log("tdDestination " + JSON.stringify(tdDestination));

    var tdFrequency = $("<td>");
    tdFrequency.text(trainData.frequencyData);
    console.log("tdFrequency " + JSON.stringify(tdFrequency));
    
    tr.append(tdName).append(tdDestination).append(tdFrequency);

    $("#schedule-section").append(tr);
    }

  }

appendTrain();

// Firebase watcher + initial loader for the subsequent submits
trainData.on("child_added", function(childsnapshot) {
  console.log(childsnapshot.val());

  // Log everything that's coming out of snapshot
  console.log(childsnapshot.val().nameData);
  console.log(childsnapshot.val().destinationData);
  console.log(childsnapshot.val().firstTrainTimeData);
  console.log(childsnapshot.val().frequencyData);

  // Call appendTrain() to write results to the #schedule-section
  appendTrain();

}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

// // --------------------------------------------------------------
// // MAIN PROCESS and INITIAL CODE AT STARTUP
// // At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// // This callback keeps the page updated when a value changes in firebase.
// trainData.on("value", function(snapshot) {
//     // We are now inside our .on function...
  
//     // Console.log the "snapshot" value (a point-in-time representation of the database)
//     console.log(snapshot.val());
//     // This "snapshot" allows the page to get the most current values in firebase.
  
//     // Change the value of our variables to match the values in the database
//     trainName = snapshot.val().nameData;
//     destination = snapshot.val().destinationData;
//     firstTrainTime = snapshot.val().firstTrainTimeData;
//     frequency = snapshot.val().frequencyData;
  
//     // Console Log the value of the train my variables
//     console.log(trainName);
//     console.log(destinationData);
//     console.log(firstTrainTime);
//     console.log(frequency);
  
//     // Change the HTML using jQuery to reflect the updated values - need to add all of the info for #schedule-section here...attr? append???
//     $("#schedule-section").text(snapshot.val().nameData);

//     //Maybe need to use attr() or append()?
//     $("#schedule-section").text(snapshot.val().destinationData);
//     $("#schedule-section").text(snapshot.val().firstTrainTimeData);
//     $("#schedule-section").text(snapshot.val().frequencyData);
  
//   // If any errors are experienced, log them to console.
//   }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });
  
  // --------------------------------------------------------------