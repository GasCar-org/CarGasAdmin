import { Component, OnInit } from "@angular/core";
import { ConstantService } from "../service/constant.service";
import { MessagingService } from "../service/_shared/messaging.service";
import { OrderService } from "../service/order.service";
import * as shape from "d3-shape";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./e-commerce.component.html",
})
export class ECommerceComponent implements OnInit {
  colorScheme: any;
  view: any[];
  single: any[];

  loading;
  selected_admin_id;
  selected_company_id;
  admins = [];
  company = [];
  search_filter = {
    start_date: "",
		end_date: "",
		time: "week",
  }

  start_date = ""
  end_date = ""
  time = "week"

  search = {
    dt_from: "",
    dt_to: "",
    admin_id: "",
    company_id: "",
  };

  colorScheme2 = "cool";
  schemeType2: string = "ordinal";
  schemeType: string = "ordinal";
  customColors2;
  single2;
  yScaleMax: number;
  view2: any[];
  view3: any[];
  width: number = 500;
  height: number = 200;

  width2: number = 700;
  height2: number = 300;

  colorScheme3 = "cool";
  schemeType3: string = "ordinal";
  customColors3;
  single3 = [];
  yScaleMax3: number;

  curves = {
    Basis: shape.curveBasis,
    "Basis Closed": shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    "Cardinal Closed": shape.curveCardinalClosed,
    "Catmull Rom": shape.curveCatmullRom,
    "Catmull Rom Closed": shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    "Linear Closed": shape.curveLinearClosed,
    "Monotone X": shape.curveMonotoneX,
    "Monotone Y": shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    "Step After": shape.curveStepAfter,
    "Step Before": shape.curveStepBefore,
    default: shape.curveLinear,
  };
  rangeFillOpacity: number = 0.15;

  curveType: string = "Linear";
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    "Basis",
    "Bundle",
    "Cardinal",
    "Catmull Rom",
    "Linear",
    "Monotone X",
    "Monotone Y",
    "Natural",
    "Step",
    "Step After",
    "Step Before",
  ];

  closedCurveType: string = "Basis";
  closedCurve: any = this.curves[this.closedCurveType];
  closedInterpolationTypes = [
    "Basis Closed",
    "Cardinal Closed",
    "Catmull Rom Closed",
    "Linear Closed",
  ];

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private service: ConstantService
  ) {}

  ngOnInit() {
    // let _user = localStorage.getItem('auth_user');
    // let current_user = JSON.parse(_user)
    // const userId = current_user['_id']
    // this.messagingService.requestPermission(userId)
    this.Save();
    this.Save2();
    //this.Save3();
    this.search_filter = {
      start_date: this.start_date,
			end_date: this.end_date,
			time: this.time,
    }
  }

  Save() {

  }

  Save2() {

  }

  Save3() {
    this.service.OrdersPerYear(this.search_filter).subscribe(
      (res) => {
        console.log(res);
        this.single3.push({
          name: res["name"] as string,
          series: res["series"] as any[],
        });
        this.single3 = [...this.single3];
      },
      (err) => {
        this.single3 = [];
        this.loading = false;
      }
    );
  }

  select2(data) {
    console.log("Item clicked", data);
    this.router.navigate(["/pages/report/rpt_errors/", data.name]);
  }
  select(data) {
    console.log("Item clicked", data);
  }

  select3(data) {
    console.log("Item clicked", data);
  }

  ApplyFilter(){
    this.search_filter = {
      start_date: this.start_date,
			end_date: this.end_date,
			time: this.time,
    }
		//this.ngOnInit()
  }

  reset(){
    this.start_date = ""
    this.end_date = ""
    this.time = "week"

    this.search_filter = {
			start_date: "",
			end_date: "",
			time: "week",
		};
		//this.ngOnInit()
  }
}
