import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserActivityService, UserActive } from '../../../@core/data/user-activity.service';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-user-activity',
  styleUrls: ['./user-activity.component.scss'],
  template: `
    <nb-card size="medium">
      <nb-card-header>
        <span>احدث المستخدمين</span>
      </nb-card-header>
      <nb-card-body>
      <div class="contact" *ngFor="let c of recent">
        <nb-user [picture]="c.image" [name]="c.full_name" [title]="c.phone_number" size="large"></nb-user>
      </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ECommerceUserActivityComponent implements OnDestroy, OnInit {

  private alive = true;

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;
  recent

  constructor(private themeService: NbThemeService,
    private userActivityService: UserActivityService,
    private service : OrderService) {

    // this.themeService.getJsTheme()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(theme => {
    //     this.currentTheme = theme.name;
    //   });
  }

  ngOnInit() {
    this.service.rpt_top15NewUsers().subscribe((res)=>{
      this.recent = res[appConstant.ITEMS] as any[]
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })
    

    // this.getUserActivity(this.type);
  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData(period)
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
