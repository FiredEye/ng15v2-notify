import 'firebase/messaging';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
// import { messaging } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
// import { getToken } from 'firebase/messaging';
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
    const localToken = localStorage.getItem('tokenv2');

    // If 'localToken' is present, return from the function
    try {
      if (localToken && localToken !== 'null') {
        console.log('Token already generated');
        alert(`Token already generated`);
        return;
      }
      
      this.afMessaging.requestToken.pipe(
        finalize(async () => {          
          console.log('Request token subscription completed');          
        })
      ).subscribe({
        next: async (token) => {
          if (token != null) localStorage.setItem('tokenv2', token);
          
          // alert(token);
          console.log(token);
          await this.router.navigate(['/about']);
        },
        error: (err) => {
          this.afMessaging.requestToken.pipe(
            finalize(async () => {          
              console.log('Request token subscription completed');          
            })
          ).subscribe({
            next: async (token) => {
              if (token != null) localStorage.setItem('tokenv2', token);
          
              // alert(token);
              console.log(token);
              await this.router.navigate(['/about']);
            },
            error: (err) => {
              console.error('Unable to get permission to notify.', err);
            },
          });
        },
      });

      // Generate Token
      //  const token = await getToken(messaging, {
      //     vapidKey:
      //       "BOG2VRDTWHk-A5JlyAQ1vJg1keK5tD2Qp1zPVrnM0pEqX--zkU4tDv3X6NGEdGTPfCIvmDS8utuGwJDzEfPASRs",
      //   });
      //   alert(token)
    } catch (error) {
      alert(error);
      console.error('Error generating or unsubscribing token:', error);
    }
  }
}
