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
  constructor() {}
  ngOnInit(){
    if(localStorage['tokenv2']&&localStorage['tokenv2']!==null){
      this.showToken=localStorage['tokenv2']
    }
  }
}
