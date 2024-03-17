import 'firebase/messaging';
import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

// import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  constructor(
    private router: Router,
    private afMessaging: AngularFireMessaging
  ) {}
  async requestNotification() {
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
  sendToken() {
    // If 'localToken' is present, return from the function
    try {
      const localToken = localStorage.getItem('tokenv2');
      if (localToken && localToken !== 'null') {
        console.log('Token already generated');
        alert(`Token already generated`);
        return;
      }

      this.afMessaging.requestToken
        .pipe(
          finalize(async () => {
            console.log('Request token subscription completed');
          })
        )
        .subscribe({
          next: async (token) => {
            if (token != null) localStorage.setItem('tokenv2', token);

            // alert(token);
            console.log(token);
            await this.router.navigate(['/about']);
          },
          error: (err) => {
            this.afMessaging.requestToken
              .pipe(
                finalize(async () => {
                  console.log('Request token subscription completed');
                })
              )
              .subscribe({
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
    } catch (error) {
      alert(error);
      console.error('Error generating or unsubscribing token:', error);
    }
  }
}
