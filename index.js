
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
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAXapb8t8GhozmtNrGg_a3BhqWgf8Xzfl4",
  authDomain: "btu-tech.firebaseapp.com",
  databaseURL: "https://btu-tech-default-rtdb.firebaseio.com",
  projectId: "btu-tech",
  storageBucket: "btu-tech.appspot.com",
  messagingSenderId: "299200607978",
  appId: "1:299200607978:web:72d2dde54b6f0b52720993",
  measurementId: "G-SFN1852GNX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});

//Button media upload
const mediaInput = document.getElementById("media-input");
const mediaUploadBtn = document.getElementById("media-upload-btn");

mediaUploadBtn.addEventListener("click", () => {
  if (mediaInput.files.length > 0) {
    uploadMedia(mediaInput.files[0]);
  }
});

const fetchMedia = db.ref("media/");

fetchMedia.on("child_added", function (snapshot) {
  const mediaData = snapshot.val();
  let mediaElement = "";

  if (mediaData.media.endsWith(".jpg") || mediaData.media.endsWith(".jpeg") || mediaData.media.endsWith(".png")) {
    mediaElement = `<li class=${
      username === mediaData.username ? "sent" : "receive"
    }><img src="${mediaData.media}" alt="${mediaData.username}'s image" /></li>`;
  } else if (mediaData.media.endsWith(".mp4") || mediaData.media.endsWith(".mov") || mediaData.media.endsWith(".avi")) {
    mediaElement = `<li class=${
      username === mediaData.username ? "sent" : "receive"
    }><video controls><source src="${mediaData.media}" type="video/${mediaData.media.split('.').pop()}"></video></li>`;
  } else if (mediaData.media.endsWith(".mp3") || mediaData.media.endsWith(".wav")) {
    mediaElement = `<li class=${
      username === mediaData.username ? "sent" : "receive"
    }><audio controls><source src="${mediaData.media}" type="audio/${mediaData.media.split('.').pop()}"></audio></li>`;
  }

  // Append the media on the page
  document.getElementById("messages").innerHTML += mediaElement;
});

// media upload
function uploadMedia(file) {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`media/${file.name}`).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // You can add a progress bar here if needed
    },
    (error) => {
      // Handle errors during upload
      console.error("Error uploading media", error);
    },
    () => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        saveMediaToDatabase(downloadURL);
      });
    }
  );
}

function saveMediaToDatabase(downloadURL) {
  const timestamp = Date.now();
  db.ref("media/" + timestamp).set({
    username,
    media: downloadURL,
  });
}