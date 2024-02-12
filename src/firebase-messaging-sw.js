importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
import config from './config/config.json';
// let config;

// fetching not working for iOS
// fetch("config/config.json")
//   .then((response) => response.json())
//   .then((data) => {
//     config = data;
// firebase.initializeApp({
//   apiKey: config.firebaseConfig.apiKey,
//   authDomain: config.firebaseConfig.authDomain,
//   databaseURL: config.firebaseConfig.databaseURL,
//   projectId: config.firebaseConfig.projectId,
//   storageBucket: config.firebaseConfig.storageBucket,
//   messagingSenderId: config.firebaseConfig.messagingSenderId,
//   appId: config.firebaseConfig.appId
// });

firebase.initializeApp({
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.authDomain,
  databaseURL: config.firebaseConfig.databaseURL,
  projectId: config.firebaseConfig.projectId,
  storageBucket: config.firebaseConfig.storageBucket,
  messagingSenderId: config.firebaseConfig.messagingSenderId,
  appId: config.firebaseConfig.appId
});

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    let notificationTitle = payload.data.title || "";
    let notificationOptions = {
      body: payload.data.body || "",
      icon: "assets/icon.png",
      data: payload.data,
    };

    // If notification object is present, update notification options
    if (payload.notification) {
      notificationTitle = payload.notification.title || "";
      notificationOptions.body =
        payload.notification.body || "";
      notificationOptions.icon ="assets/icon.png";
    }

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} else {
  console.log("Browser not supported!");
}
  // });

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Android needs explicit close.
    if(event.notification.data) {
        event.notification.data.isFirebaseMessaging = false;
    }
    event.waitUntil(
        clients.matchAll({includeUncontrolled: true,type: 'window'}).then( windowClients => {

        let rootUrl = new URL('/', location).href;
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                var url = client.url;
                // If so, just focus it.
                if (url.indexOf(rootUrl) == 0  && 'focus' in client) {
                    client.postMessage(event.notification.data);
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

self.addEventListener('message', function(event){
});

self.addEventListener('install', function(event) {
    self.skipWaiting();
});
