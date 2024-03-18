import 'firebase/messaging';
import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements OnInit {
  showToken: any;
  constructor(private afMessaging: AngularFireMessaging) {}
  ngOnInit() {
    if (localStorage['tokenv2'] && localStorage['tokenv2'] !== null) {
      this.showToken = localStorage['tokenv2'];
    }
  }
  requestNotification() {
    this.afMessaging.requestPermission.subscribe({
      next: (permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          alert('notification permission granted.');
        } else {
          // alert("permission denied from global service")
          console.log('Notification permission denied.');
          alert('notification permission denied.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
