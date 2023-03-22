
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDxOdEND8_wuHDIhJ-Pl4d6V7G1--5I-jE",
    authDomain: "rent-rocks.firebaseapp.com",
    projectId: "rent-rocks",
    storageBucket: "rent-rocks.appspot.com",
    messagingSenderId: "759429873823",
    appId: "1:759429873823:web:fefb37fdcdee734239e2aa",
    measurementId: "G-FJRWXRQXHS"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});