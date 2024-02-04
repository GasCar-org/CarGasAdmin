import { OrderService } from './../../../pages/service/order.service';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;
  badge = '';
  badge2 = '';
  chats = 0;
  userMenu = [{ title: 'تعديل كلمة المرور' }, { title: 'تسجيل الخروج' }];

  constructor(private sidebarService: NbSidebarService,
    private Orders: OrderService,
    private menuService: NbMenuService,
    private router: Router,
    private db2: AngularFireDatabase,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private route: Router,
    private layoutService: LayoutService) {
    let _user = localStorage.getItem('auth_user');
    this.user = JSON.parse(_user)
  }


  // add() {
  //   console.log('fff')
  // }

  ngOnInit() {
    // this.db2.list('messages').snapshotChanges().subscribe((item) => {
    //   console.log(item)
    //   for (let key of item) {
    //     console.log(key, item)
    //     this.db2.list('/messages/' + key['key'], ref => ref.orderByChild('isRead').equalTo(false)).valueChanges().subscribe((items) => {
    //       // this.db2.list('messages/'+key['key']).snapshotChanges().subscribe((items)=>{
    //       this.chats += items.length
    //     })
    //   }
    // });
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']
    
    this.Orders.getNewOrder(id).subscribe((res) => {
      this.badge = res as any
    })

    this.Orders.getNewRatedOrder(id).subscribe((res) => {
      this.badge2 = res as any
    })

    // this.userService.getUsers().subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  onMenuItemClick() {
    this.router.navigate(['/pages/order/orders']);
  }

  onMenuItemClick2() {
    this.router.navigate(['/pages/order/rates']);
  }

  // onMessageClick() {
  //   this.router.navigate(['/pages/order/chat']);
  // }

  logout() {
    if (window.confirm('هل تود تسجيل الخروج؟')) {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('roles')
      this.route.navigate(['/SignIn'])
    }
  }
}
