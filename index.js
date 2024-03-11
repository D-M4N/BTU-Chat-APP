
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

      //npm install -g firebase-tools
      //npm install firebase
      
//To download and install the CLI run the following command:

      //curl -sL firebase.tools | bash


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
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

const username = prompt("Please Tell Us Your Name");

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  // auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  const newMessageRef = ref(db, 'messages/' + timestamp);
  newMessageRef.set({
    username,
    message,
  });
}

// Get a reference to the messages collection
const messagesRef = ref(db, 'messages');

// Attach an asynchronous callback to read the data at the messagesRef reference
onChildAdded(messagesRef, (snapshot) => {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

