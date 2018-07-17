
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
  
// This is passing in our firebase config information  
firebase.initializeApp(config);

// VARIABLES
// --------------------------------------------------------------------------------
// put your firebase database into a variable called database
var dataRef = firebase.database();
// create a root folder so that we can define subfolders off of root
var rootFolder = database.ref();
// create folder variables for each of our variables - we will pass these in to ref() so that everything in root doesn't get wiped out by ref() without parameters
var trainNameFolder = database.ref('trainName');
var destinationFolder = database.ref('destination');
var firstTrainTimeFolder = database.ref('firstTrainTime');
var frequencyFolder = database.ref('frequency');

// Initial values for our actual variables
// Name of train
var trainName = "";
// Destination
var destination = "";
// Should this be data type string???
var firstTrainTime = "";
// frequency train runs in minutes
var frequency = 0;


// --------------------------------------------------------------
// MAIN PROCESS and INITIAL CODE AT STARTUP
// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
database.ref().on("value", function(snapshot) {
    // We are now inside our .on function...
  
    // Console.log the "snapshot" value (a point-in-time representation of the database)
    console.log(snapshot.val());
    // This "snapshot" allows the page to get the most current values in firebase.
  
    // Change the value of our variables to match the values in the database
    trainName = snapshot.val().trainNameFolder;
    destination = snapshot.val().destinationFolder;
    firstTrainTime = snapshot.val().firstTrainTimeFolder;
    frequency = snapshot.val().frequencyFolder;
  
    // Console Log the value of the clickCounter
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    // Change the HTML using jQuery to reflect the updated values - need to add all of the info for #schedule-section here...attr? append???
    $("#schedule-section").text(snapshot.val().trainName);

    //Maybe need to use attr() or append()?
    $("#schedule-section").text(snapshot.val().destination);
    $("#schedule-section").text(snapshot.val().firstTrainTime);
    $("#schedule-section").text(snapshot.val().frequency);
    // Alternate solution to the above line
    // $("#schedule-section").html(clickCounter);
  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  // --------------------------------------------------------------


// Now we need to handle the button clicks
$("#add-train").on("click", function(event) {
event.preventDefault();
    
// YOUR TASK!!!
// Code in the logic for storing and retrieving the most data for these fields.
// Don't forget to provide initial data to your Firebase database.
trainName = $("#train-name-input").val().trim();
destination = $("#destination-input").val().trim();
firstTrainTime = $("#first-train-time-input").val().trim();
frequency = $("#frequency-input").val().trim();

// what is the difference between set() and push() and add()? Which should I use? I have activities that use both

// Code for the push - not clear on how to do this with all of the folders...do I need multiple dataRef.push calls, one for each folder?
dataRef.ref(trainNameFolder).push({
    trainName: name
    });
});

// Save new value to Firebase
database.ref().set({
    clickCount: clickCounter
  });