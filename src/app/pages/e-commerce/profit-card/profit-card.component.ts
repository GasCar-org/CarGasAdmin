import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';
import { formatLabel } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-profit-card',
  styleUrls: ['./profit-card.component.scss'],
  templateUrl: './profit-card.component.html',
})
export class ProfitCardComponent implements OnInit,OnChanges {
  flipped = false;
  width: number = 700;
  height: number = 300;

  colorScheme: any;
  view: any[]
  single: any[];

  colorScheme2: any;
  view2: any[]
  single2: any[];

	@Input() filter: any;
  constructor(private service: OrderService) {

  }

  ngOnInit() {
    //this.getData()
  }

  getData(){
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let id = userObj['supplier_id']
    this.service.rpt_importantCounters(id,this.filter).subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[]
      this.single = items

      this.colorScheme = 'ocean'
      this.view = [this.width, this.height];
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })
  }
  getBackData(){
    this.service.rpt_getTop10Cities(this.filter).subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[]
      this.single2 = items
      this.colorScheme2 = 'nightLights'
      this.view2 = [this.width, this.height];
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
       let change = changes[propName];
       let curVal  = JSON.stringify(change.currentValue);
       let prevVal = JSON.stringify(change.previousValue);
       this.filter = JSON.parse(curVal)
       this.getData()

    }
  }

  toggleFlipView() {
    this.flipped = !this.flipped;
    this.getBackData()
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  select(data) {
    console.log('Item clicked', data);
  }


  valueFormatting2(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
  }

  onLegendLabelClick2(entry) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText2({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  select2(data) {
    console.log('Item clicked', data);
  }
  dblclick(event) {
    console.log('Doube click', event);
  }

}

