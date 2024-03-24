import 'firebase/messaging';
import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements OnInit {
  showToken: any;
  constructor(private afMessaging: AngularFireMessaging,private router: Router,) {}
  ngOnInit() {
    
    if (localStorage['tokenv2'] && localStorage['tokenv2'] !== null) {
      this.showToken = localStorage['tokenv2'];
    }
  }
  requestToken(){
    
          this.afMessaging.requestToken
            .pipe(
              finalize(async () => {
                alert('request token finalize')
                console.log('Request token subscription completed');
              })
            )
            .subscribe({
              next: async (token) => {
                if (token != null) {
                  localStorage.setItem('tokenv2', token);
                  alert(`from request : ${token}`);

                  // alert(token);
                  console.log(token);
                  await this.router.navigate(['/']);
                }
              },
              error: (err) => {
                alert("err req1"+JSON.stringify(err))

                console.error('Unable to get permission to notify.', err);
              },
            });
      
  }
getToken(){
    this.afMessaging.getToken
    .pipe(
      finalize(async () => {
        alert('get token finalize')
        console.log('Get token subscription completed');
      })
    )
    .subscribe({
      next: (toke) => {
        if (toke == null) {
          this.afMessaging.requestToken
            .pipe(
              finalize(async () => {
                alert('request token finalize')
                console.log('Request token subscription completed');
              })
            )
            .subscribe({
              next: async (token) => {
                if (token != null) {
                  localStorage.setItem('tokenv2', token);
                  alert(`from request : ${token}`);

                  // alert(token);
                  console.log(token);
                  await this.router.navigate(['/']);
                }
              },
              error: (err) => {
                alert("err req1"+err)

                console.error('Unable to get permission to notify.', err);
              },
            });
        } else {
          localStorage.setItem('tokenv2', toke);
          alert(`already generated: ${toke}`);
        }
      },
      error: (er) => {
        this.afMessaging.requestToken
            .pipe(
              finalize(async () => {
                alert('err request token finalize')
                console.log('Request token subscription completed');
              })
            )
            .subscribe({
              next: async (token) => {
                if (token != null) {
                  localStorage.setItem('tokenv2', token);
                  alert(`from request : ${token}`);

                  // alert(token);
                  console.log(token);
                  await this.router.navigate(['/']);
                }
              },
              error: (err) => {
                alert("err req2"+err)
                console.error('Unable to get permission to notify.', err);
              },
            });
      },
    });
  }
  requestNotification() {
  
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        alert('allowed');
        // …
      } else if (permission === 'denied') {
        alert('denied');
      }
    });
  }
}
