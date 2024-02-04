import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "../../service/order.service";
import { appConstant } from "../../service/_constant/appConstant";
@Component({
  selector: "ngx-ordermap",
  templateUrl: "./ordermap.component.html",
  styleUrls: ["./ordermap.component.scss"],
})
export class OrdermapComponent implements OnInit {
  zoom: number = 8;
  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  label = "";
  isVisible = false;
  loading;
  user_id: {
    full_name: "";
    phone_number: "";
  };

  postData = {
    _id: "",
    user_id: "",
    addressDetails: "",
  };
  search = {
    dt_from: "",
    dt_to: "",
  };
  public origin: any;
  public destination: any;
  marker: any[];
  constructor(
    private service: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];

    var content = {
      supplier_id: id,
    };
    // this.service.rpt_getOrderMaps(content).subscribe((res) => {
    //   let response = res[appConstant.ITEMS] as any[]
    //   this.marker = response;
    //   console.log(this.marker)
    //   if (response.length > 0) {
    //     this.lat = response[0]['lat'] as any
    //     this.lng = response[0]['lng'] as any
    //   }

    //   this.isVisible = true;
    //   this.loading = false
    // })
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  getDirection() {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: 31.312925, lng: 34.234762 };

    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

  Save(search) {
    this.loading = true;
    var content = {};
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];

    if (search) {
      content = {
        dt_start: search.dt_from,
        dt_end: search.dt_to,
        supplier_id: id,
      };
    }

    this.service.rpt_getOrderMaps(content).subscribe(
      (res) => {
        let response = res[appConstant.ITEMS];
        this.marker = response;
        console.log(this.marker);
        if (this.marker.length > 0) {
          this.lat = response[0]["lat"] as any;
          this.lng = response[0]["lng"] as any;
        }
        this.isVisible = true;
        this.loading = false;
      },
      (err) => {
        this.isVisible = true;
        this.loading = false;
      }
    );
  }

  reset() {
    this.search = {
      dt_from: "",
      dt_to: "",
    };
  }
}
