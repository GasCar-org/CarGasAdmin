import { appConstant } from './../../service/_constant/appConstant';
import { Component } from '@angular/core';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {

  items = []
  progressInfoData: any
  constructor(private service: OrderService) {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']

    this.service.rpt_getDailyRevenu(id).subscribe((res) => {
      this.items = res[appConstant.ITEMS] as any[];
      console.log(this.items[1])
      this.progressInfoData = [
        {
          title: 'الطلبات اليومية المنجزة',
          value: this.items[0]._all,
          activeProgress: this.items[0]._all / 100,
          description: '',
        },
        {
          title: 'جاري التوصيل',
          value: this.items[1].newOrders,
          activeProgress: this.items[1].newOrders / 100,
          description: '',
        },
        {
          title: 'الطلبات الملغاة من العملاء',
          value: this.items[3].cancelOrder_users,
          activeProgress: this.items[3].cancelOrder_users / 100,
          description: '',
        },
        {
          title: 'الطلبات الملغاة من السائقين',
          value: this.items[2].cancelOrder_drivers,
          activeProgress: this.items[2].cancelOrder_drivers / 100,
          description: '',
        }
      ];
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })
  }
}
