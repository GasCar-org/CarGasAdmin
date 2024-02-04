import { appConstant } from './../../../service/_constant/appConstant';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EarningService, PieChart } from '../../../../@core/data/earning.service';
import { takeWhile } from 'rxjs/operators';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'ngx-earning-card-back',
  styleUrls: ['./earning-card-back.component.scss'],
  templateUrl: './earning-card-back.component.html',
})
export class EarningCardBackComponent implements OnInit, OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[];
  name: string;
  color: string;
  value: number;
  defaultSelectedCurrency: string 
  pieChartData = [
    {
      value: 0,
      name:''
    },
    {
      value:0,
      name: ''
    }
  ]
  constructor(private earningService: EarningService , private service:OrderService ) {

  

    // this.earningService.getEarningPieChartData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((earningPieChartData) => {
    //   });
  }

  ngOnInit(){
    // let userObj = JSON.parse(localStorage.getItem('auth_user'))
    // let sid = userObj['supplier_id']
    // this.service.rpt_getTop3Category(id,this.filter).subscribe((res)=>{
    //   console.log(res)
    //   let items = res[appConstant.ITEMS] as any[]
    //    this.pieChartData = [
    //     {
    //       value: items[0].count,
    //       name: items[0].name,
    //     },
    //     {
    //       value: items[1].count,
    //       name: items[1].name,
    //     },
    //     {
    //       value: items[2].count,
    //       name: items[2].name,
    //     }
    //   ];

    //   this.defaultSelectedCurrency = items[0].name
    //   this.earningPieChartData = this.pieChartData;

    // },(err)=>{
    //   this.service.serverSideErrorHandler(err)
    // })
  }
  changeChartInfo(pieData: {value: number; name: string; color: any}) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
