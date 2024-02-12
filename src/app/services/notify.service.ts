import 'firebase/messaging';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Injectable } from '@angular/core';
// import { messaging, db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
// import { getToken} from "firebase/messaging";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(
    private router: Router,
    private afMessaging: AngularFireMessaging
  ) {}

  async requestnotifyPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('notification permission granted.');
      console.log('Notification permission granted.');
      // alert("permission granted from global service")
      return true;
    } else {
      // alert("permission denied from global service")
      alert('notification permission denied.');
      return false;
    }
  }
  async requestAndSendToken() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const localToken = localStorage.getItem('token');

      // If 'localToken' is present, return from the function
      if (localToken) {
        console.log('Token already generated');
        alert(`Token already generated`);
        return;
      }

      try {
        this.afMessaging.requestToken.subscribe({
          next: (token) => {

            if(token!=null) localStorage.setItem("token", token);        

            alert(token);

            this.router.navigate(['/about']);
          },
          error: (err) => {
            console.error('Unable to get permission to notify.', err);
          },
        });

        // Generate Token
        //  const token = await getToken(messaging, {
        //     vapidKey:
        //       "BOG2VRDTWHk-A5JlyAQ1vJg1keK5tD2Qp1zPVrnM0pEqX--zkU4tDv3X6NGEdGTPfCIvmDS8utuGwJDzEfPASRs",
        //   });
        //   alert(token)
        //   localStorage.setItem("token", token);
        //   this.router.navigate(['/about']);
      } catch (error) {
        alert(error);
        console.error('Error generating or unsubscribing token:', error);
      }
    } else if (permission === 'denied') {
      alert('You denied for the notification');
    }
  }
}
