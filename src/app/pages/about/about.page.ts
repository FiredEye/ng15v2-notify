import { finalize } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css'],
})
export class AboutPage implements OnInit, OnDestroy {
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
    this.intervalFunction = setInterval(() => {
      try {
        this.afMessaging.requestPermission.subscribe({
          next: (permission) => {
            if (permission == 'granted') {
              alert(permission);
              const localToken = localStorage.getItem('tokenv2');
              if (localToken && localToken !== 'null') {
                alert(localToken);
                console.log('Token already generated');
                // alert(`Token already generated`);
                return;
              }
              this.afMessaging.getToken.subscribe({
                next: (toke) => {
                  if (toke !== null) return;
                },
                error: (er) => {
                  console.log(er);
                },
              });

              this.afMessaging.requestToken
                .pipe(
                  finalize(async () => {
                    console.log('Request token subscription completed');
                  })
                )
                .subscribe({
                  next: async (token) => {
                    alert(`from first request : ${token}`);
                    if (token != null) localStorage.setItem('tokenv2', token);

                    // alert(token);
                    console.log(token);
                    await this.router.navigate(['/']);
                  },
                  error: (err) => {
                    this.afMessaging.getToken.subscribe({
                      next: (toke) => {
                        if (toke !== null) return;
                      },
                      error: (er) => {
                        console.log(er);
                      },
                    });

                    this.afMessaging.requestToken
                      .pipe(
                        finalize(async () => {
                          console.log('Request token subscription completed');
                        })
                      )
                      .subscribe({
                        next: async (token) => {
                          if (token != null)
                            localStorage.setItem('tokenv2', token);
                          alert(`from second request : ${token}`);

                          // alert(token);
                          console.log(token);
                          await this.router.navigate(['/']);
                        },
                        error: (err) => {
                          console.error(
                            'Unable to get permission to notify.',
                            err
                          );
                        },
                      });
                  },
                });
            }
          },
        });
      } catch (error) {
        alert(error);
        console.error('Error generating or unsubscribing token:', error);
      }
    }, 8000);
  }

  ngOnDestroy() {
    if (this.intervalFunction) {
      clearInterval(this.intervalFunction);
    }
  }
}
