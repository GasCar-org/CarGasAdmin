import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { MessagingService } from './pages/service/_shared/messaging.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngx-app',
  template: `
  <toaster-container [toasterconfig]="config"></toaster-container>
  <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  d: NbLayoutDirection;
  message;
  currentMessage = new BehaviorSubject(null);

  config = new ToasterConfig({
    positionClass: 'toast-bottom-left',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });

  showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.Default,
    };
    this.toasterService.popAsync(toast);
  }

  constructor(private analytics: AnalyticsService,
    dir: NbLayoutDirectionService,
    private angularFireMessaging: AngularFireMessaging,
    private toasterService: ToasterService,
    private messagingService: MessagingService) {
    this.d = NbLayoutDirection.RTL;
    dir.setDirection(this.d);

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();

    // const userId = 'user001';
    // this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    console.log(this.message)

    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        let body = payload['notification']['body']
        let title = payload['notification']['title']
        this.playAudio()
        this.showToast('warning',title,body)
      })
  }


  playAudio(){
    let audio = new Audio();
    audio.src = "../assets/audio/1.mp3";
    audio.load();
    audio.play();
  }
}
