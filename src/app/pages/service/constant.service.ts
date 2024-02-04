import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { ToasterService, BodyOutputType, Toast, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: "root",
})
export class ConstantService {
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


  getDeliveryData() {
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];
    return this.http.get(appConstant.BASE_URL + "settings/" + id);
  }

  DeleteDeliveryData(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()
      }),
    };

    return this.http.post(appConstant.BASE_URL + `settings/${id}`,{}, httpOptions);
  }

  UpdateDeliveryData(id, conent) {
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
      appConstant.BASE_URL + `settings/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateDeliveryData(conent) {
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
      appConstant.BASE_URL + "settings",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getDeliveryOptionsData() {
    return this.http.get(appConstant.BASE_URL + "city");
  }

  OrdersPerYear(filter) {
    return this.http.get(appConstant.BASE_URL + `OrdersPerYear?start_date=${filter.start_date}&end_date=${filter.end_date}`);
  }

  getDeliverytimeData() {
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];
    return this.http.get(appConstant.BASE_URL + "delivery_time/" + id);
  }

  DeleteDeliverytimeData(id) {
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
      appConstant.BASE_URL + `deletedelivery_time/${id}`,
      {},
      httpOptions
    );
  }

  DeleteDeliveryOptionsData(id) {
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
      appConstant.BASE_URL + `deleteDeliveryOption/${id}`,
      {},
      httpOptions
    );
  }

  UpdateDeliveryTimeData(id, conent) {
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
      appConstant.BASE_URL + `delivery_time/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  UpdateDeliveryOptionsData(id, conent) {
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
      appConstant.BASE_URL + `DeliveryOption/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }
  CreateDeliveryTimeData(conent) {
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
      appConstant.BASE_URL + "delivery_time",
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateDeliveryOptionsData(conent) {
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
      appConstant.BASE_URL + "DeliveryOption",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getBuyUnitsData() {
    return this.http.get(appConstant.BASE_URL + "/constant/BuyUnits");
  }

  DeleteBuyUnitsData(id) {
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
      appConstant.BASE_URL + `/constant/BuyUnits/${id}`,
      {},
      httpOptions
    );
  }

  UpdateBuyUnitsData(id, conent) {
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
      appConstant.BASE_URL + `/constant/BuyUnits/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateBuyUnitsData(conent) {
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
      appConstant.BASE_URL + "/constant/BuyUnits",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getBuyOptionsData() {
    return this.http.get(appConstant.BASE_URL + "/constant/BuyOptions");
  }

  DeleteBuyOptionsData(id) {
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
      appConstant.BASE_URL + `/constant/BuyOptions/${id}`,
      {},
      httpOptions
    );
  }

  UpdateBuyOptionsData(id, conent) {
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
      appConstant.BASE_URL + `/constant/BuyOptions/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateBuyOptionsData(conent) {
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
      appConstant.BASE_URL + "/constant/BuyOptions",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getContactOptionData() {
    return this.http.get(appConstant.BASE_URL + "Contact");
  }

  DeleteContactOptionData(id) {
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
      appConstant.BASE_URL + `deleteContactOption/${id}`,
      {},
      httpOptions
    );
  }

  UpdateContactOptionData(id, conent) {
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
      appConstant.BASE_URL + `ContactOption/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateContactOptionData(conent) {
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
      appConstant.BASE_URL + "ContactOption",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSocialOptionData() {
    return this.http.get(appConstant.BASE_URL + "social");
  }

  DeleteSocialOptionData(id) {
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
      appConstant.BASE_URL + `deleteSocialOption/${id}`,
      {},
      httpOptions
    );
  }

  UpdateSocialOptionData(id, conent) {
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
      appConstant.BASE_URL + `SocialOption/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateSocialOptionData(conent) {
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
      appConstant.BASE_URL + "SocialOption",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getStaticPagenData() {
    return this.http.get(appConstant.BASE_URL + "getStaticPage");
  }

  getSingleStaticPagenData(id) {
    return this.http.get(appConstant.BASE_URL + `staticpage/${id}`);
  }

  DeleteStaticPageData(id) {
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
      appConstant.BASE_URL + `deletestaticpage/${id}`,
      {},
      httpOptions
    );
  }

  UpdateStaticPageData(id, conent) {
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
      appConstant.BASE_URL + `staticpage/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateStaticPageData(conent) {
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
      appConstant.BASE_URL + "staticpage",
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateCategoryData(conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);

    return this.http.post(
      appConstant.BASE_URL + "category",
      formData,
      httpOptions
    );
  }

  getCategoryData() {
    return this.http.get(appConstant.BASE_URL + "getCategoriesAdmin");
  }

  getSingleCategoryData(id) {
    return this.http.get(appConstant.BASE_URL + `category/${id}`);
  }

  DeleteCategoryData(id) {
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
      appConstant.BASE_URL + `deletecategory/${id}`,
      {},
      httpOptions
    );
  }

  UpdateCategoryData(id, conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);
    return this.http.post(
      appConstant.BASE_URL + `category/${id}`,
      formData,
      httpOptions
    );
  }

  CreateSubCategoryData(conent) {
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
      appConstant.BASE_URL + "/product/subcategory",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSubCategoryData() {
    return this.http.get(appConstant.BASE_URL + "/product/subcategory");
  }

  getSubCategoryDataByCategoryId(id) {
    return this.http.get(
      appConstant.BASE_URL + `/product/subcategorybycategoryid/${id}`
    );
  }

  getSingleSubCategoryData(id) {
    return this.http.get(appConstant.BASE_URL + `/product/subcategory/${id}`);
  }

  DeleteSubCategoryData(id) {
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
      appConstant.BASE_URL + `/product/subcategory/${id}`,
      {},
      httpOptions
    );
  }

  UpdateSubCategoryData(id, conent) {
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
      appConstant.BASE_URL + `/product/subcategory/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  CreateSupplierData(conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);
    formData.append("details", conent.details);
    formData.append("email", conent.email);
    formData.append("password", conent.password);
    return this.http.post(
      appConstant.BASE_URL + "supplier",
      formData,
      httpOptions
    );
  }

  getSupplierData() {
    return this.http.get(appConstant.BASE_URL + "supplier");
  }

  getSingleSupplierData(id) {
    return this.http.get(appConstant.BASE_URL + `supplier/${id}`);
  }

  DeleteSupplierData(id) {
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
      appConstant.BASE_URL + `deletesupplier/${id}`,
      {},
      httpOptions
    );
  }

  UpdateSupplierData(id, conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);
    formData.append("details", conent.details);
    formData.append("email", conent.email);
    formData.append("password", conent.password);
    return this.http.post(
      appConstant.BASE_URL + `supplier/${id}`,
      formData,
      httpOptions
    );
  }

  CreateProductData(conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);
    formData.append("description", conent.description);
    formData.append("price", conent.price);
    formData.append("price_buy_new", conent.price_buy_new);
    formData.append("warrenty", conent.warrenty);
    formData.append("category_id", conent.category_id);
    formData.append("isReplacement", conent.isReplacement);
    formData.append("isNewProduct", conent.isNewProduct);
    formData.append("supplier_id", conent.supplier_id);
    formData.append("isSort", conent.isSort);
    return this.http.post(
      appConstant.BASE_URL + "product",
      formData,
      httpOptions
    );
  }

  getProductData(id, page) {
    return this.http.get(
      appConstant.BASE_URL + "products/" + id + "?page=" + page + "&limit=10"
    );
  }

  getSearchProductData(conent) {
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
      appConstant.BASE_URL + "productSearch",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSupplierProductSearchProductData(conent) {
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
      appConstant.BASE_URL + "/Supplier/SupplierProductSearchPanel",
      JSON.stringify(conent),
      httpOptions
    );
  }
  getProductDataBySubCategoryId(id) {
    return this.http.get(appConstant.BASE_URL + `productbysubcategoryid/${id}`);
  }

  getSingleProductData(id) {
    return this.http.get(appConstant.BASE_URL + `product/${id}`);
  }

  DeleteProductData(id) {
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
      appConstant.BASE_URL + `deleteproduct/${id}`,
      {},
      httpOptions
    );
  }

  UpdateProductData(id, conent) {
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
    formData.append("image", conent.image);
    formData.append("name", conent.name);
    formData.append("description", conent.description);
    formData.append("price", conent.price);
    formData.append("price_buy_new", conent.price_buy_new);
    formData.append("warrenty", conent.warrenty);
    formData.append("category_id", conent.category_id);
    formData.append("isReplacement", conent.isReplacement);
    formData.append("isNewProduct", conent.isNewProduct);
    formData.append("isSort", conent.isSort);
    return this.http.post(
      appConstant.BASE_URL + `product/${id}`,
      formData,
      httpOptions
    );
  }

  DeleteOneImage(img) {
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
      appConstant.BASE_URL + `product/delete/${img}`,
      {},
      httpOptions
    );
  }

  CreateSupplierProductData(conent) {
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
      appConstant.BASE_URL + "/Supplier/supplierproducts",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSupplierProductData() {
    return this.http.get(appConstant.BASE_URL + "/Supplier/supplierproducts");
  }
  getSupplierProductDataPagination(pageIndex, pageSize) {
    return this.http.get(
      appConstant.BASE_URL +
        "/Product/pageSample?page=" +
        pageIndex +
        "&limit=" +
        pageSize
    );
  }

  getSingleSupplierProductData(id) {
    return this.http.get(
      appConstant.BASE_URL + `/Supplier/supplierproducts/${id}`
    );
  }

  DeleteSupplierProductData(id) {
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
      appConstant.BASE_URL + `/Supplier/supplierproducts/${id}`,
      {},
      httpOptions
    );
  }

  UpdateSupplierProductData(id, conent) {
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
      appConstant.BASE_URL + `/Supplier/supplierproducts/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  AddDiscount(id, conent) {
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
      appConstant.BASE_URL + `/Supplier/addDiscount/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  getSupplierProductBySeacrhData(key, page) {
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
        "/Supplier/supplierproductsSearch?page=" +
        page +
        "&limit=10",
      JSON.stringify(key),
      httpOptions
    );
  }

  getSupplierProductBySubCategory(id, supid) {
    return this.http.get(
      appConstant.BASE_URL +
        `/Supplier/supplierproductsBySubCategoryId/${id}/${supid}`
    );
  }

  getsupplierproductsBySupplierId(id) {
    return this.http.get(
      appConstant.BASE_URL + `/Supplier/supplierproductsBySupplierId/${id}`
    );
  }

  CreateAdvtData(conent) {
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
    formData.append("filename", conent.image);
    formData.append("name", conent.name);
    formData.append("details", conent.details);
    // formData.append('supplier_id', conent.supplier_id)
    formData.append("price_before", conent.price_before);
    formData.append("price_after", conent.price_after);
    formData.append("type", conent.type);
    // formData.append('product_id', conent.product_id)

    return this.http.post(
      appConstant.BASE_URL + "adv/adv",
      formData,
      httpOptions
    );
  }

  getAdvData() {
    return this.http.get(appConstant.BASE_URL + "adv/adv");
  }

  getSingleAdvData(id) {
    return this.http.get(appConstant.BASE_URL + `adv/adv/${id}`);
  }

  DeleteAdvData(id) {
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
      appConstant.BASE_URL + `adv/deleteadv/${id}`,
      {},
      httpOptions
    );
  }

  UpdateAdvData(id, conent) {
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
    formData.append("filename", conent.image);
    formData.append("name", conent.name);
    formData.append("details", conent.details);
    // formData.append('supplier_id', conent.supplier_id)
    formData.append("price_before", conent.price_before);
    formData.append("price_after", conent.price_after);
    formData.append("type", conent.type);
    // formData.append('product_id', conent.product_id)

    return this.http.post(
      appConstant.BASE_URL + `adv/adv/${id}`,
      formData,
      httpOptions
    );
  }

  CreateAdminData(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };
    return this.http.post(
      appConstant.BASE_URL + "admin",
      JSON.stringify(conent),
      httpOptions
    );
  }

  getAdminData() {
    return this.http.get(appConstant.BASE_URL + "admin");
  }

  getSingleAdminData(id) {
    return this.http.get(appConstant.BASE_URL + `admin/${id}`);
  }

  DeleteAdminData(id) {
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
      appConstant.BASE_URL + `deleteadmin/${id}`,
      {},
      httpOptions
    );
  }

  UpdateAdminData(id, conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `admin/${id}`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  login(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `loginAdmin`,
      JSON.stringify(conent),
      httpOptions
    );
  }

  refreshtoken(conent) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token : this.getMyToken()

      }),
    };

    return this.http.post(
      appConstant.BASE_URL + `refreshtokenAdmin`,
      JSON.stringify(conent),
      httpOptions
    );
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
    formData.append("filename", uploadFile);
    return this.http.post(
      appConstant.BASE_URL + `/Product/file_upload`,
      formData,
      httpOptions
    );
  }
}
