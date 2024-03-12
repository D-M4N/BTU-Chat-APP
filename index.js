
// You can deploy now or later. To deploy now, open a terminal window, 
// then navigate to or create a root directory for your web app.
// Sign in to Google

      //firebase login

// Initiate your project
// Run this command from your app's root directory:

      // firebase init

// When you're ready, deploy your web app
// Put your static files (e.g., HTML, CSS, JS) 
// in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:  

      //firebase deploy

//To download and install the Firebase CLI run the following command:
      
      //npm install firebase
      //npm install -g firebase-tools
      
      
      
// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXapb8t8GhozmtNrGg_a3BhqWgf8Xzfl4",
  authDomain: "btu-tech.firebaseapp.com",
  databaseURL: "https://btu-tech-default-rtdb.firebaseio.com",
  projectId: "btu-tech",
  storageBucket: "btu-tech.appspot.com",
  messagingSenderId: "299200607978",
  appId: "1:299200607978:web:72d2dde54b6f0b52720993",
  measurementId: "G-SFN1852GNX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Get a reference to the messages collection
const messagesRef = database.ref('messages');

// Listen for new messages and add them to the DOM
messagesRef.limitToLast(25).on('child_added', (snapshot) => {
  const message = snapshot.val();
  displayMessage(message.name, message.text);
});

// Function to display a message
function displayMessage(name, text) {
  const messages = document.getElementById('messages');
  const messageElement = document.createElement('li');
  messageElement.innerText = `${name}: ${text}`;
  messages.appendChild(messageElement);
}

// Function to send a message
function sendMessage(e) {
  e.preventDefault();
  const name = 'Anonymous'; // You can replace this with the user's name or a username
  const text = document.getElementById('message-input').value;
  messagesRef.push({ name, text });
  document.getElementById('message-input').value = '';
}

// Add an event listener for the send button
document.getElementById('message-form').addEventListener('submit', sendMessage);
