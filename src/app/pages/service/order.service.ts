import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { ToasterService, BodyOutputType, Toast, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: "root",
})
export class OrderService {
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

  getRatedOrders(id, page) {
    return this.http.get(
      appConstant.BASE_URL +
        "getRatedOrders/" +
        id +
        "?page=" +
        page +
        "&limit=10"
    );
  }

  getTunckOrders(page) {
    return this.http.get(
      appConstant.BASE_URL + "getTunckOrders?page=" + page + "&limit=10"
    );
  }

  getOrderData(id, page) {
    return this.http.get(
      appConstant.BASE_URL + "getOrders/" + id + "?page=" + page + "&limit=10"
    );
  }

  getSingleOrderData(id) {
    return this.http.get(appConstant.BASE_URL + "getOrderDetails?id=" + id);
  }

  getOrderSearchData(id, content, page) {
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
      appConstant.BASE_URL +
        "getOrdersSeacrh/" +
        id +
        "?page=" +
        page +
        "&limit=10",
      JSON.stringify(content),
      httpOptions
    );
  }
  getNewOrder(id) {
    return this.http.get(appConstant.BASE_URL + `getNewOrder/${id}`);
  }

  getNewRatedOrder(id) {
    return this.http.get(appConstant.BASE_URL + `getNewRatedOrder/${id}`);
  }

  getSingOrderData(id) {
    return this.http.get(appConstant.BASE_URL + `getOrderDetails?id=${id}`);
  }

  UpdateOrderData(id, conent) {
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
      appConstant.BASE_URL + `updateOrderByAdmin/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  addCompanyCommission(conent) {
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
      appConstant.BASE_URL + `addCompanyCommission`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  updateRate(id, conent) {
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
      appConstant.BASE_URL + `updateRate/${id}`,
      httpOptions
    );
  }

  UpdateOrderDriverData(id, conent) {
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
      appConstant.BASE_URL + `addOrderDriver/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  rpt_getOrderMaps(content) {
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
      appConstant.BASE_URL + "rpt_getOrderMaps",
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_getRevenu(page, content) {
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
      appConstant.BASE_URL + `rpt_getRevenu?page=${page}&limit=50`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_getOrderswithstatus(page, content) {
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
      appConstant.BASE_URL + `rpt_getOrderswithstatus?page=${page}&limit=50`,
      JSON.stringify(content),
      httpOptions
    );
  }

  rpt_getCompanyCommission(page) {
    return this.http.get(
      appConstant.BASE_URL + "rpt_getCompanyCommission?page=${page}&limit=50"
    );
  }

  rpt_getDailyRevenu(id) {
    return this.http.get(appConstant.BASE_URL + "getDailyRevenu/" + id);
  }

  rpt_getProductsCount(id) {
    return this.http.get(appConstant.BASE_URL + "getProductsCount/" + id);
  }

  rpt_getTop3Category(id,filter) {
    return this.http.get(appConstant.BASE_URL + "getTop3Category/" + id+`?start_date=${filter.start_date}&end_date=${filter.end_date}&time=${filter.time}`);
  }

  rpt_getTop5Suppliers() {
    return this.http.get(appConstant.BASE_URL + "getTop5Suppliers");
  }

  rpt_importantCounters(id,filter) {
    return this.http.get(appConstant.BASE_URL + "importantCounters/" + id+`?start_date=${filter.start_date}&end_date=${filter.end_date}&time=${filter.time}`);
  }

  rpt_getTop10Cities(filter) {
    return this.http.get(appConstant.BASE_URL + `getTop10Cities?start_date=${filter.start_date}&end_date=${filter.end_date}&time=${filter.time}`);
  }

  rpt_top15NewUsers() {
    return this.http.get(appConstant.BASE_URL + "top15NewUsers");
  }

  rpt_UsersPerYear() {
    return this.http.get(appConstant.BASE_URL + "UsersPerYear");
  }

  rpt_OrdersPerYear() {
    return this.http.get(appConstant.BASE_URL + "OrdersPerYear");
  }

  rpt_getTop5RegisterCities() {
    return this.http.get(appConstant.BASE_URL + "getTop5RegisterCities");
  }

  rpt_revenuPerYear(id,filter) {
    return this.http.get(appConstant.BASE_URL + "revenuPerYear/" + id+`?start_date=${filter.start_date}&end_date=${filter.end_date}&time=${filter.time}`);
  }

  rpt_SupplierPerYear(id,filter) {
    return this.http.get(appConstant.BASE_URL + "SupplierPerYear/" + id+`?start_date=${filter.start_date}&end_date=${filter.end_date}&time=${filter.time}`);
  }
}
