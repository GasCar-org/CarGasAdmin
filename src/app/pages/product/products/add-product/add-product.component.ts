import { appConstant } from "./../../../service/_constant/appConstant";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import {
  ToasterConfig,
  Toast,
  BodyOutputType,
  ToasterService,
} from "angular2-toaster";
import { ConstantService } from "../../../service/constant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, mergeMap } from "rxjs/operators";
import { SuperComponent } from "../../../../_components/SuperComponent/SuperComponent";
const uri = appConstant.BASE_URL + "file_upload";

@Component({
  selector: "ngx-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent extends SuperComponent
  implements OnInit, OnDestroy {
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 5 });
  attachmentList: any = [];
  imagesArr = [];
  thumImage = "";
  cateogires = [];
  selected_category_id;

  product = {
    name: "",
    image: "",
    price: 0,
    price_buy_new: 0,
    warrenty: "",
    description: "",
    category_id: "",
    rate: "",
    isNewProduct: false,
    isReplacement: false,
    supplier_id: "",
    isSort: 1,
  };

  constructor(
    private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super(route, toasterService, router);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.loading = true;
    this.subscripe = this.service
      .getCategoryData()
      .pipe(
        switchMap((res) => {
          this.cateogires = res[appConstant.ITEMS] as any[];
          console.log(this.cateogires);
          this.loading = false;
          return this.service.getSingleProductData(this.id);
        })
      )
      .subscribe((res2) => {
        if (this.id) {
          this.product = res2 as any;
          this.isEdit = true;
          this.imagesArr = this.product["images"];
          this.selected_category_id = res2["category_id"];
        }
      },(err)=>{
        // this.service.serverSideErrorHandler(err)
      });
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  Save(category) {
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.upload(category);
      } else {
        let userObj = JSON.parse(localStorage.getItem("auth_user"));
        let id = userObj["supplier_id"];

        let conent = {
          name: category.name,
          image: category.image,
          price: category.price,
          price_buy_new: category.price_buy_new,
          warrenty: category.warrenty,
          category_id: this.selected_category_id,
          description: category.description,
          isNewProduct: category.isNewProduct,
          isReplacement: category.isReplacement,
          supplier_id: id,
          isSort: category.isSort,
        };
        console.log(conent);
        this.loading = true;
        this.service.UpdateProductData(this.id, conent).subscribe(
          (x) => {
            this.product = {
              name: "",
              image: "",
              price: 0,
              price_buy_new: 0,
              warrenty: "",
              description: "",
              category_id: "",
              rate: "",
              isNewProduct: false,
              isReplacement: false,
              supplier_id: "",
              isSort: 1,
            };
            this.loading = false;
            this.router.navigate(["/pages/product/products"]);
          },
          (err) => {this.loading = false
            this.service.serverSideErrorHandler(err)
          }
        );
      }
    } else {
      this.upload(category);
    }
  }

  upload(category) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      // var res = JSON.parse(response);
      // var resArr = res.filename;
      // for (let key in resArr[0]) {
      //   if (key == 'filename') {
      //     let value = resArr[0][key];
      //     this.category.image = value
      //   }
      // }
      let userObj = JSON.parse(localStorage.getItem("auth_user"));
      let id = userObj["supplier_id"];

      console.log(item.file.rawFile);
      const img = item.file.rawFile;
      this.product.image = img;

      this.product.name = category.name;
      this.product.description = category.description;
      this.product.price = category.price;
      this.product.price_buy_new = category.price_buy_new;
      this.product.category_id = this.selected_category_id;
      this.product.warrenty = category.warrenty;
      this.product.isNewProduct = category.isNewProduct;
      this.product.isReplacement = category.isReplacement;
      this.product.supplier_id = id;
      this.product.isSort = category.isSort;

      if (this.id) {
        this.loading = true;
        this.service.UpdateProductData(this.id, this.product).subscribe(
          (x) => {
            this.product = {
              name: "",
              image: "",
              price: 0,
              price_buy_new: 0,
              warrenty: "",
              description: "",
              category_id: "",
              rate: "",
              isNewProduct: false,
              isReplacement: false,
              supplier_id: "",
              isSort: 1,
            };
            this.loading = false;
            this.uploader.clearQueue();
            this.resetfile();
            this.router.navigate(["/pages/product/products"]);
          },
          (err) => {this.loading = false
            this.service.serverSideErrorHandler(err)
          }
        );
      } else {
        this.loading = true;
        this.service.CreateProductData(this.product).subscribe(
          (x) => {
            this.product = {
              name: "",
              image: "",
              price: 0,
              price_buy_new: 0,
              warrenty: "",
              description: "",
              category_id: "",
              rate: "",
              isNewProduct: false,
              isReplacement: false,
              supplier_id: "",
              isSort: 1,
            };
            this.loading = false;
            this.uploader.clearQueue();
            this.resetfile();
            this.router.navigate(["/pages/product/product"]);
          },
          (err) => {
            this.loading = false
            this.service.serverSideErrorHandler(err)
          }
        );
      }
    };
  }

  resetfile() {
    this.product = {
      name: "",
      image: "",
      price: 0,
      price_buy_new: 0,
      warrenty: "",
      description: "",
      category_id: "",
      rate: "",
      isNewProduct: false,
      isReplacement: false,
      supplier_id: "",
      isSort: 1,
    };
  }

  CategoryChanging(val) {
    this.selected_category_id = val._id;
  }

  onChangeNew(val) {
    this.product.isNewProduct = !this.product.isNewProduct;
    console.log(this.product.isNewProduct);
  }

  onChangeRep(val) {
    this.product.isReplacement = !this.product.isReplacement;
    console.log(this.product.isReplacement);
  }
}
