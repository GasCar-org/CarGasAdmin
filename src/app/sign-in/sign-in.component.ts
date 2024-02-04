import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbAuthSocialLink, NbAuthService, NbAuthResult, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { getDeepFromObject } from './helper';
// import { DataMapperService } from '../pages/Users/User/data-mapper.service';
import 'rxjs/add/operator/take';
import { ConstantService } from '../pages/service/constant.service';
import { MessagingService } from '../pages/service/_shared/messaging.service';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  User = {
    email: '',
    password: ''
  };


  submitted: boolean = false;
  strategy: string = '';

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router,
    private auth: ConstantService,
    // private db: DataMapperService,
    private messagingService: MessagingService,
    private db2: AngularFireDatabase,
  ) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
    this.strategy = this.getConfigValue('forms.login.strategy');

  }

  login(): void {
    this.submitted = true;
    this.errors = this.messages = [];
    let arr = []

    console.log(this.User)
    this.auth.login(this.User).subscribe((response) => {
      let status = response['status']
      if (status == true) {

        const userId = response['items']['_id'];
        const roles = response['items']['roles'];
        roles.forEach(element => {
          arr.push(element.name)
        });
        this.messagingService.requestPermission(userId)

        setTimeout(() => {

          localStorage.setItem('auth_user', JSON.stringify(response['items']));
          localStorage.setItem('roles',JSON.stringify(arr))
          this.router.navigate(['/']);
        }, 3000);
      }
      else {
        this.errors = ['خطأ في البريد الالكتروني او كلمة المرور']
        this.submitted = false;
      }
    });


    // let user = this.db2.list('Admins', ref => ref
    //   .orderByChild("email")
    //   .startAt(this.User.email)
    //   .endAt(this.User.email + "\uf8ff"))
    //   .valueChanges()
    //   .subscribe(x => {
    //     console.log(x)
    //     if (!x) {
    //       this.errors = ['خطأ في البريد الالكتروني او كلمة المرور']
    //       this.submitted = false;
    //     }
    //     else {
    //       let _user = x[0] as any
    //       if (_user.password == this.User.password) {
    //         this.db.findUserByEmail(this.User.email).subscribe(x => {
    //           if (x.length > 0) {
    //             let loginUser = x[0] as any;
    //             setTimeout(() => {
    //               localStorage.setItem('userid', loginUser.key)
    //               localStorage.setItem('fullName', _user.fullName)
    //               this.router.navigate(['/']);
    //             }, 3000);
    //           }
    //         });
    //       }
    //       else {
    //         this.errors = ['خطأ في البريد الالكتروني او كلمة المرور']
    //         this.submitted = false;
    //       }
    //     }
    //   });


  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}