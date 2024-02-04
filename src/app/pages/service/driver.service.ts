import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { Observable } from "rxjs";
import { ToasterService, BodyOutputType, Toast, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: "root",
})
export class DriverService {
  constructor(private http: HttpClient , private toaster:ToasterService) {}


  config = new ToasterConfig({
    positionClass: 'toast-bottom-left',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });

  showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.Default,
    };
    this.toaster.popAsync(toast);
  }

  getMyToken() {
		if (localStorage.getItem("auth_user")) {
      let userObj = JSON.parse(localStorage.getItem('auth_user'))
      return  userObj['token']
    }else{
      return ""
    }
	}

	serverSideErrorHandler(error) {
		if (error) {
      this.showToast('error',error.error.message,'Error')
		}
	}

	customeErrorHandler(error) {
		if (error) {
      this.showToast('error',error.error.message,'Error')
		}
	}


  getDriverList(id) {
    return this.http.get(appConstant.BASE_URL + "DriverList/" + id);
  }

  getDriverInfo(id) {
    return this.http.get(appConstant.BASE_URL + "DriverProfile/" + id);
  }

  BlockDriver(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `blockDriver/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  deleteDriver(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `deleteDriver/${id}`,
      {},
      httpOptions
    );
  }

  UpdateDriverProfile(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `updateprofileFromAdmin/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateNewDriver(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "addDriver",
      JSON.stringify(conent),
      httpOptions
    );
  }

  reSendCode(id) {}

  CreateNotification(deviceId, msg) {
    return new Observable((obs) => {
      let postModel = {
        notification: {
          title: " استغل الفرصة لديك كوبون تسوق ",
          body: msg.msg + msg.coupon,
          sound: "default",

          // "click_action": "FCM_PLUGIN_ACTIVITY",
          // "icon": "fcm_push_icon"
        },
        data: {
          data: msg.coupon,
        },
        to: deviceId,
      };
      console.log(postModel);
      var data = JSON.stringify(postModel);
      var xhr = new XMLHttpRequest();
      //xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
      xhr.setRequestHeader(
        "Authorization",
        "key=AAAAN6yOxXI:APA91bH99PN9-Cyfph4w4Tf1pWScF1M3OZOhpsM1FrTZdbjjhhPnDaSmP5MAqTsAY8hPNWx4FaCnBsqgLUlwtzc5cv4osE0uPwSvYwU31bHE_LaHMuLeB9qFcXKkIV59_Rr1eWZbWJoY"
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    });
  }

  AddImagetoServer(uploadFile) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };
    const formData: FormData = new FormData();
    formData.append("image", uploadFile);
    return this.http.post(
      appConstant.BASE_URL + `uploadDriverPhoto`,
      formData,
      httpOptions
    );
  }
}
