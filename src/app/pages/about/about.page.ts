import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css'],
})
export class AboutPage implements OnInit {
  showToken: any;
  intervalFunction: any;
  constructor(
    public notifyService: NotifyService,
    private router: Router,
    private afMessaging: AngularFireMessaging
  ) {}
  requestNotification() {
    this.notifyService.requestnotifyPermission();
  }

  ngOnInit() {
    setInterval(() => {
      try {
        const localToken = localStorage.getItem('tokenv2');
        if (localToken && localToken !== 'null') {
          alert(localToken);
          console.log('Token already generated');
          // alert(`Token already generated`);
          return;
        }
        this.afMessaging.getToken.subscribe({
          next: (toke) => {
            if (toke == null) {
              this.afMessaging.requestToken
                .pipe(
                  finalize(async () => {
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
                    console.error('Unable to get permission to notify.', err);
                  },
                });
            } else {
              localStorage.setItem('tokenv2', toke);
              alert(`already generated: ${toke}`);
            }
          },
          error: (er) => {
            console.log(er);
          },
        });
      } catch (error) {
        alert(error);
        console.error('Error generating or unsubscribing token:', error);
      }
    }, 8000);
  }
}
