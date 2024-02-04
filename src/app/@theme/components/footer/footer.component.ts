import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">تنفيذ واشراف <b><a href="https://techno2030.com/" target="_blank">شركة تقنيات ريادية</a></b> 2019</span>
    <div class="socials">
      <a href="https://www.instagram.com/techno2030com/" target="_blank" class="ion ion-social-instagram"></a>
      <a href="https://www.facebook.com/tech.riyadea" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/techno2030com/status/1030186200781479936?s=19" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/abdulaziz-aljuhani-0545500488/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
