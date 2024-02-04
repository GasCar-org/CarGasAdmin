import { ActivatedRoute, Router } from "@angular/router";
import { ConstantService } from "./../service/constant.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { appConstant } from "../service/_constant/appConstant";
import { DriverService } from "../service/driver.service";
import { SuperComponent } from "../../_components/SuperComponent/SuperComponent";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "ngx-sendnotification",
  templateUrl: "./sendnotification.component.html",
  styleUrls: ["./sendnotification.component.scss"],
})
export class SendnotificationComponent extends SuperComponent
  implements OnInit {
  users_ids = [];
  cities = [];
  selectedDrivers = [];
  Drivers = [];
  selected_cat = "";
  selected_city = "";
  msg = {
    title: "",
    body: "",
    type: 10,
  };

  constructor(
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private _userService: UserService,
    private constant: ConstantService,
    private service: DriverService
  ) {
    super(route, toasterService, router);
  }

  ngOnInit() {
    this.constant.getDeliveryOptionsData().subscribe((x) => {
      this.cities = x[appConstant.ITEMS] as any[];
    });
  }

  selectCategory(val) {
    console.log(val);
    this.selected_cat = val;
    if (this.selected_cat == "2") {
      let userObj = JSON.parse(localStorage.getItem("auth_user"));
      let sid = userObj["supplier_id"];

      this.service.getDriverList(sid).subscribe((userList) => {
        console.log(userList[appConstant.ITEMS]);
        this.Drivers = userList[appConstant.ITEMS] as any;
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  selectCity(val) {
    console.log(val);
    this.selected_city = val;
  }

  Save(msg) {
    this.users_ids = [];
    if (this.selected_cat == "0") {
      //for all users
      // this._userService.getAllUsers().subscribe((x) => {
      //   let users = x[appConstant.ITEMS] as any[];
      //   users.forEach((element) => {
      //     if (this.users_ids.length <= 999) {
      //       this.users_ids.push(element.fcmToken);
      //     }
      //   });
      //   console.log(this.users_ids);
      //   this._userService
      //     .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
      //     .subscribe();
      //   this.reset();
      //   this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      // });

      let content = {
        type: 1,
        title: this.msg.title,
        msg: this.msg.body,
      };

      this._userService.SendMASSNotifications(content).subscribe((x) => {
        this.reset();
        this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      });
    } else if (this.selected_cat == "1") {
      // for all drivers

      // let userObj = JSON.parse(localStorage.getItem("auth_user"));
      // let sid = userObj["supplier_id"];

      // this.service.getDriverList(sid).subscribe((x) => {
      //   let users = x[appConstant.ITEMS] as any[];
      //   users.forEach((element) => {
      //     if (this.users_ids.length <= 999) {
      //       this.users_ids.push(element.fcmToken);
      //     }
      //   });
      //   this._userService
      //     .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
      //     .subscribe();
      //   this.reset();
      //   this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      // });

      let content = {
        type: 2,
        title: this.msg.title,
        msg: this.msg.body,
      };

      this._userService.SendMASSNotifications(content).subscribe((x) => {
        this.reset();
        this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
      });
    } else if (this.selected_cat == "2") {
      // for selected drivers
      console.log(this.selectedDrivers);
      this.selectedDrivers.forEach((element) => {
        if (this.users_ids.length <= 999) {
          this.users_ids.push(element.fcmToken);
        }
      });
      this._userService
        .CreateGeneralNotificationForMultiple(this.users_ids, this.msg)
        .subscribe();
      this.reset();
      this.showToast("success", "نجاح", "تم ارسال الاشعار بنجاح");
    }
  }

  reset() {
    this.msg = {
      title: "",
      body: "",
      type: 10,
    };
  }
}
