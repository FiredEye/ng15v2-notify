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
    alert('hello')
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
