import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart.service';
import { ProfitChart } from '../../../@core/data/profit-chart.service';
import { OrdersProfitChartService, OrderProfitChartSummary } from '../../../@core/data/orders-profit-chart.service';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnChanges,OnDestroy {
	@Input() filter: any;

  colorScheme = 'cool'
  schemeType: string = 'ordinal';
  customColors
  single
  view
  width: number = 900;
  height: number = 300;



  colorScheme2 = 'horizon'
  schemeType2: string = 'ordinal';
  customColors2
  single2
  view2
  width2: number = 1000;
  height2: number = 300;
  yScaleMax: number;

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'اسبوع';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  // @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  // @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartService,
    private service: OrderService) {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']


    // this.service.rpt_getProductsCount(id).subscribe((item) => {
    //   let items = item[appConstant.ITEMS] as any[]
    //   this.chartPanelSummary = [
    //     {
    //       title: 'المنتجات',
    //       value: items[3].Products,
    //     },
    //     {
    //       title: 'عائدات الطلبات',
    //       value: items[0].revenu,
    //     },
    //     {
    //       title: 'عائدات الشحن',
    //       value: items[1].deliveryCostRevenu,
    //     },
    //     {
    //       title: 'الاجمالي',
    //       value: Number(items[0].revenu) + Number(items[1].deliveryCostRevenu)
    //     },
    //   ];
    // })
    // this.getOrdersChartData()


    // this.ordersProfitChartService.getOrderProfitChartSummary()
    //   // .pipe(takeWhile(() => this.alive))
    //   .subscribe((summary) => {
    //     console.log(summary)
    //     this.chartPanelSummary = summary;
    //   });

    // this.getOrdersChartData(this.period);
    // this.getProfitChartData(this.period);
  }

  // setPeriodAndGetChartData(value: string): void {
  //   if (this.period !== value) {
  //     this.period = value;
  //   }

  //   this.getOrdersChartData(value);
  //   this.getProfitChartData(value);
  // }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'الارباح') {
      this.getOrdersChartData()
    } else {
      this.getProfitChartData()
    }
  }

  getOrdersChartData() {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']

    this.service.rpt_revenuPerYear(id,this.filter).subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[]
      this.single = items
      this.view = [this.width, this.height];

    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })
  }

  getProfitChartData() {
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']

    this.service.rpt_SupplierPerYear(id,this.filter).subscribe((res) => {
      this.single2 = res as any[]
      this.view2 = [this.width2, this.height2];
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })
  }

  ngOnDestroy() {
    //this.alive = false;
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  select2(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick2(entry) {
    console.log('Legend clicked', entry);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
       let change = changes[propName];
       let curVal  = JSON.stringify(change.currentValue);
       let prevVal = JSON.stringify(change.previousValue);
       this.filter = JSON.parse(curVal)
       this.getOrdersChartData()
      //  this.getProfitChartData()
    }
  }

}
