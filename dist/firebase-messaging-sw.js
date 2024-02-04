importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '239118239090',
  "apiKey": "AIzaSyABN7HaigdqFPQx9un5pngBD7w6w2Cz5_E",
  "authDomain": "gazapp-4e160.firebaseapp.com",
  "databaseURL": "https://gazapp-4e160.firebaseio.com",
  "projectId": "gazapp-4e160",
  "storageBucket": "gazapp-4e160.appspot.com"
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

