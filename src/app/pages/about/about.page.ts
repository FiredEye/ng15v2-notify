import { finalize } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  // intervalFunction: any = setInterval(() => {
  //   try {
  //     const localToken = localStorage.getItem('tokenv2');
  //     if (localToken && localToken !== 'null') {
  //       // alert(`Token already generated`);
  //       return;
  //     }
  //     this.afMessaging.getToken
  //       .pipe(
  //         finalize(async () => {
  //           console.log('Get token subscription completed');
  //         })
  //       )
  //       .subscribe({
  //         next: (toke) => {
  //           if (toke == null) {
  //             this.afMessaging.requestToken
  //               .pipe(
  //                 finalize(async () => {
  //                   console.log('Request token subscription completed');
  //                 })
  //               )
  //               .subscribe({
  //                 next: async (token) => {
  //                   if (token != null) {
  //                     localStorage.setItem('tokenv2', token);
  //                     alert(`from request : ${token}`);

  //                     // alert(token);
  //                     console.log(token);
  //                     await this.router.navigate(['/']);
  //                   }
  //                 },
  //                 error: (err) => {
  //                   console.error('Unable to get permission to notify.', err);
  //                 },
  //               });
  //           } else {
  //             localStorage.setItem('tokenv2', toke);
  //             alert(`already generated: ${toke}`);
  //           }
  //         },
  //         error: (er) => {
  //           this.afMessaging.requestToken
  //               .pipe(
  //                 finalize(async () => {
  //                   console.log('Request token subscription completed');
  //                 })
  //               )
  //               .subscribe({
  //                 next: async (token) => {
  //                   if (token != null) {
  //                     localStorage.setItem('tokenv2', token);
  //                     alert(`from request : ${token}`);

  //                     // alert(token);
  //                     console.log(token);
  //                     await this.router.navigate(['/']);
  //                   }
  //                 },
  //                 error: (err) => {
  //                   console.error('Unable to get permission to notify.', err);
  //                 },
  //               });
  //         },
  //       });
  //   } catch (error) {
  //     alert(error);
  //     console.error('Error generating or unsubscribing token:', error);
  //   }
  // }, 3000);
  constructor(
    public notifyService: NotifyService,
    private router: Router,
    private afMessaging: AngularFireMessaging
  ) {}
  requestNotification() {
    this.notifyService.requestnotifyPermission();
  }

  ngOnInit() {
    if (localStorage['tokenv2'] && localStorage['tokenv2'] !== null) {
      this.showToken = localStorage['tokenv2'];
    }
    // this.intervalFunction;
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
  ngOnDestroy(): void {
    // clearInterval(this.intervalFunction);
  }
}
