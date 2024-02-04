import { switchMap } from "rxjs/operators";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { formatLabel } from "@swimlane/ngx-charts";
import { OrderService } from "../../service/order.service";
import { appConstant } from "../../service/_constant/appConstant";

@Component({
  selector: "ngx-earning-card",
  styleUrls: ["./earning-card.component.scss"],
  templateUrl: "./earning-card.component.html",
})
export class EarningCardComponent implements OnInit,OnChanges {
  flipped = false;
  width: number = 500;
  height: number = 200;

  colorScheme: any;
  view: any[];
  single: any[] = [];

  colorScheme2: any;
  view2: any[];
  single2: any[];
	@Input() filter: any;

  constructor(private service: OrderService) {}

  ngOnInit() {
  
  }

  getData(){
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];
    this.single = []
    let arr = []
    this.service.rpt_getTop3Category(id, this.filter).subscribe((res) => {
      let items = res[appConstant.ITEMS] as any[];
      items.forEach((element,idx) => {
        var obj = {
          value: element.count,
          name: element.name,
        }
        arr.push(obj)
      });
      this.single = [...arr]
      console.log(this.single)
      // this.single = [
      //   {
      //     value: items[0].count,
      //     name: items[0].name,
      //   },
      //   {
      //     value: items[1].count,
      //     name: items[1].name,
      //   },
      //   {
      //     value: items[2].count,
      //     name: items[2].name,
      //   },
      //   {
      //     value: items[3].count,
      //     name: items[3].name,
      //   },
      // ];
      this.colorScheme = "cool";
      this.view = [this.width, this.height];
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    });
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
    // this.service.rpt_getTop5Suppliers().subscribe((res) => {
    //   let items = res[appConstant.ITEMS] as any[]
    //   this.single2 = [
    //     {
    //       value: items[0].count,
    //       name: items[0].name,
    //     }
    //     // {
    //     //   value: items[1].count,
    //     //   name: items[1].name,
    //     // },
    //     // {
    //     //   value: items[2].count,
    //     //   name: items[2].name,
    //     // },
    //     // {
    //     //   value: items[3].count,
    //     //   name: items[3].name,
    //     // }
    //   ];
    //   this.colorScheme2 = 'picnic'
    //   this.view2 = [this.width, this.height];
    // })
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
  }

 

  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }


  valueFormatting2(value: number): string {
    return `${Math.round(value).toLocaleString()}`;
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
    console.log("Item clicked", data);
  }
}
