import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

// Get the config file
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(function(registration) {
          console.log('Service Worker registered with scope:', registration);
      }).catch(function(err) {
          console.error('Service Worker registration failed:', err);
      });
}
fetch(`config/config.json`)
  .then(response => response.json())
  .then((response: any) => {
    // Here we add the additional provider
    platformBrowserDynamic([{provide: FIREBASE_OPTIONS, useValue: response.firebaseConfig}])
      .bootstrapModule(AppModule)
      .catch(err => console.log(err));
}).catch((response: any) => {
  console.error('On config load', response);
});
