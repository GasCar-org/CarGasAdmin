import { SuperComponent } from "./../../../_components/SuperComponent/SuperComponent";
import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ConstantService } from "../../service/constant.service";
import {
  ToasterService,
  ToasterConfig,
  Toast,
  BodyOutputType,
} from "angular2-toaster";
import { FormatDateService } from "../../service/custom/format-date.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { appConstant } from "../../service/_constant/appConstant";
import { Page } from "../../service/_constant/page";

@Component({
  selector: "ngx-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent extends SuperComponent implements OnInit {
  page = new Page();
  rows = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;

  constructor(
    private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super(route, toasterService, router);
    this.setPage({ offset: 0 });
  }

  ngOnInit() {}

  setPage(pageInfo) {
    console.log(pageInfo);
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;

    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];

    this.service
      .getProductData(id, this.page.pageNumber)
      .subscribe((pagedData) => {
        let _page = pagedData[appConstant.PAGINATION];
        console.log(_page);
        if (_page.pageNumber != _page.totalPages) {
          this.page = _page;
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        } else if (_page.totalPages == 0) {
          this.page = _page;
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        } else {
          let _rows = pagedData[appConstant.ITEMS] as any[];
          this.rows = _rows;
          this.isLoading = false;
        }
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
  }

  ngOnDestroy() {}

  onDeleteConfirm(event) {
    if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
      console.log(event);
      this.service.DeleteProductData(event["_id"]).subscribe((x) => {
        this.showToast("success", "نجاح", "تم حذف المنتج بنجاح");
        this.setPage(1);
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  onUpdate(event) {
    this.router.navigate(["/pages/product/product/" + event["_id"]]);
  }

  getRowClass(row) {
    return { "age-is-ten": row["isBlock"] == true };
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const content = {
      name: val,
    };
    this.page.pageNumber = 0;
    if (val.value != "") {
      this.isLoading = true;
      this.service.getSearchProductData(content).subscribe((res) => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    } else {
      this.setPage(1);
    }

    // const temp = this.rows.filter(function (d) {
    //   return d['phone_number'].toLowerCase().indexOf(val) !== -1 || !val;
    // });

    // this.rows = temp;
    // this.page.pageNumber = 1;
  }
}
