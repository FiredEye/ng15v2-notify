importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");



firebase.initializeApp({
  apiKey: "AIzaSyBu2emmod70NGOcDid_q81x3gP6FAW-Ro8",
  authDomain: "push-notify-b8795.firebaseapp.com",
  databaseURL: "https://push-notify-b8795-default-rtdb.firebaseio.com",
  projectId: "push-notify-b8795",
  storageBucket: "push-notify-b8795.appspot.com",
  messagingSenderId: "131374839398",
  appId: "1:131374839398:web:3fa637d133a5407c65dfa7",
});

 
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});


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
