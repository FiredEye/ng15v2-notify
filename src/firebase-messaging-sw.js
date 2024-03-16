importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

let config;

// fetching not working for iOS
// fetch("config/config.json")
//   .then((response) => response.json())
//   .then((data) => {
//     config = data;
//     firebase.initializeApp({
//       apiKey: config.firebaseConfig.apiKey,
//       authDomain: config.firebaseConfig.authDomain,
//       databaseURL: config.firebaseConfig.databaseURL,
//       projectId: config.firebaseConfig.projectId,
//       storageBucket: config.firebaseConfig.storageBucket,
//       messagingSenderId: config.firebaseConfig.messagingSenderId,
//       appId: config.firebaseConfig.appId,
//     });

firebase.initializeApp({
  apiKey: "AIzaSyBu2emmod70NGOcDid_q81x3gP6FAW-Ro8",
  authDomain: "push-notify-b8795.firebaseapp.com",
  databaseURL: "https://push-notify-b8795-default-rtdb.firebaseio.com",
  projectId: "push-notify-b8795",
  storageBucket: "push-notify-b8795.appspot.com",
  messagingSenderId: "131374839398",
  appId: "1:131374839398:web:3fa637d133a5407c65dfa7",
});

  const messaging=firebase.messaging();
  messaging.setBackgroundMessageHandler((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
      const notificationTitle = payload.notification.title || "";
      const notificationOptions = {
        body: payload.notification.body || "",
        icon:"./assets/icon.png"
      };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

// });
