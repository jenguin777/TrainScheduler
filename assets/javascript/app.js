
// Initialize Firebase
var config = {
    apiKey: "AIzaSyALppos2MnyJCWdKNQ8-CnaMMNKTry7eMg",
    authDomain: "train-scheduler-84b57.firebaseapp.com",
    databaseURL: "https://train-scheduler-84b57.firebaseio.com",
    projectId: "train-scheduler-84b57",
    //storageBucket: "train-scheduler-84b57.appspot.com",
    storageBucket: "",
    //messagingSenderId: "11579043529"
  };
  
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
// Name of train
var trainName = "";
// Destination
var destination = "";
// Should this be data type string???
var firstTrainTime = "";
// frequency train runs in minutes
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function(event) {
event.preventDefault();
    
// YOUR TASK!!!
// Code in the logic for storing and retrieving the most recent user.
// Don't forget to provide initial data to your Firebase database.
trainName = $("#train-name-input").val().trim();
destination = $("#destination-input").val().trim();
firstTrainTime = $("#first-train-time-input").val().trim();
frequency = $("#frequency-input").val().trim();

// Code for the push
dataRef.ref().push({

    trainName: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});