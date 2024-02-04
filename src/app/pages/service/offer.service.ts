import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { ToasterService, BodyOutputType, Toast, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: "root",
})
export class OfferService {
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
    console.log(error)
		if (error) {
      this.showToast('error',error.error.message,'Error')
		}
	}

	customeErrorHandler(error) {
		if (error) {
      this.showToast('error',error.error.message,'Error')
		}
	}

  CreateBasketData(conent) {
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
      appConstant.BASE_URL + "/basket/basket",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getBasketData() {
    return this.http.get(appConstant.BASE_URL + "/basket/basket");
  }

  getSingBasketData(id) {
    return this.http.get(appConstant.BASE_URL + `/basket/basket/${id}`);
  }

  DeleteBaskettData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.delete(
      appConstant.BASE_URL + `/basket/basket/${id}`,
      httpOptions
    );
  }

  UpdateBaskettData(id, conent) {
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
      appConstant.BASE_URL + `/basket/basket/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateOfferData(conent) {
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
      appConstant.BASE_URL + "/quota/quota",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getOfferData(page) {
    return this.http.get(
      appConstant.BASE_URL + "/quota/quota?page=" + page + "&limit=10"
    );
  }

  getSingOfferData(id) {
    return this.http.get(appConstant.BASE_URL + `/quota/quota/${id}`);
  }

  DeleteOfferData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      }),
    };

    return this.http.delete(
      appConstant.BASE_URL + `/quota/quota/${id}`,
      httpOptions
    );
  }

  UpdateOfferData(id, conent) {
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
      appConstant.BASE_URL + `/quota/quota/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateCouponData(conent) {
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
      appConstant.BASE_URL + "coupon/coupon",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getCouponData() {
    return this.http.get(appConstant.BASE_URL + "coupon/coupon");
  }

  getSingCouponData(id) {
    return this.http.get(appConstant.BASE_URL + `coupon/coupon/${id}`);
  }

  DeleteCouponData(id) {
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
      appConstant.BASE_URL + `coupon/coupon/${id}`,
      httpOptions
    );
  }

  UpdateCouponData(id, conent) {
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
      appConstant.BASE_URL + `coupon/coupon/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreatePointData(conent) {
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
      appConstant.BASE_URL + "addPoint",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getPointData(id) {
    return this.http.get(appConstant.BASE_URL + "getSupplierPoint/" + id);
  }

  getSingPointData(id) {
    return this.http.get(appConstant.BASE_URL + `getSinglePoint/${id}`);
  }

  DeletePointData(id) {
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
      appConstant.BASE_URL + `deletePoint/${id}`,
      httpOptions
    );
  }

  UpdatePointtData(id, conent) {
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
      appConstant.BASE_URL + `updatePoint/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }
}
