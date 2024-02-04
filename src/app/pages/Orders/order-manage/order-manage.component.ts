import { Component, OnInit, ViewChild } from "@angular/core";
import { SuperComponent } from "../../../_components/SuperComponent/SuperComponent";
import { Page } from "../../service/_constant/page";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConstantService } from "../../service/constant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import * as moment from "moment";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { enGbLocale } from "ngx-bootstrap/locale";
import { format } from "date-fns";
import { DateFormatPipe } from "../../service/pipe/date-format.pipe";
import { appConstant } from "../../service/_constant/appConstant";
import { OrderService } from "../../service/order.service";
import { DriverService } from "../../service/driver.service";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "ngx-order-manage",
  templateUrl: "./order-manage.component.html",
  styleUrls: ["./order-manage.component.scss"],
})
export class OrderManageComponent extends SuperComponent implements OnInit {
  @ViewChild("myTable") table: any;
  expanded: any = {};
  suppliers;
  supplier_id;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  page = new Page();
  rows = new Array<any>();
  rowsItems = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;
  modalReference: NgbModalRef;
  postData: any;

  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;
  label = "Client Location";

  selected_driver_id;
  selected_status_id;
  drivers = [];
  cateogires = [];
  Notes = "";
  isVisible = false;
  isSearch = false;

  content = {
    full_name: "",
    phone_number: "",
    nanaOrderId: "",
  };

  constructor(
    private service: OrderService,
    private driver: DriverService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private modalService: NgbModal,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService,
    private router: Router,
    private db2: AngularFireDatabase
  ) {
    super(route, toasterService, router);
    this._localeService.use("en");
    moment.locale("en");
    defineLocale("en", enGbLocale);
  }

  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;

    let content = {
      id: this.supplier_id,
    };

    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];

    console.log(this.isSearch);
    if (this.isSearch == false) {
      this.service
        .getOrderData(id, this.page.pageNumber)
        .subscribe((pagedData) => {
          let _page = pagedData[appConstant.PAGINATION];
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
          console.log(this.rows);
        },(err)=>{this.loading = false
          this.service.serverSideErrorHandler(err)
        });
    } else {
      this.isLoading = true;
      let userObj = JSON.parse(localStorage.getItem("auth_user"));
      let sid = userObj["supplier_id"];

      this.service
        .getOrderSearchData(sid, this.content, 0)
        .subscribe((pagedData) => {
          let _page = pagedData[appConstant.PAGINATION];
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
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  reset() {
    this.isSearch = false;
    this.content = {
      full_name: "",
      phone_number: "",
      nanaOrderId: "",
    };
    this.ngOnInit();
  }

  EditRow(event) {
    //this.router.navigate(['/pages/product/addsupplierproducts/', event['_id']]);
  }

  updateFilter() {
    this.page.pageNumber = 0;
    this.isSearch = true;
    this.setPage({ offset: 0 });
  }

  openModal(contentCategory, event) {
    this.isEdit = false;
    this.service.getSingOrderData(event["_id"]).subscribe((res) => {
      let response = res[appConstant.ITEMS];
      this.postData = response[0];
      this.rowsItems = response[0]["items"] as any[];
      this.modalReference = this.modalService.open(contentCategory, {
        size: "lg",
      });
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }
  openModal2(contentCategory, event) {
    this.isEdit = false;
    this.id = event["_id"];

    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let sid = userObj["supplier_id"];

    this.driver.getDriverList(sid).subscribe((res) => {
      this.drivers = res[appConstant.ITEMS] as any;
      this.loading = false;
      this.modalReference = this.modalService.open(contentCategory);
    });
  }

  openModal3(contentStatus, event) {
    this.id = event["_id"];
    this.modalReference = this.modalService.open(contentStatus);
  }

  close(content) {
    this.modalReference.close();
    this.id = "";
  }

  SaveOrderDriver(event) {
    this.service
      .UpdateOrderDriverData(this.id, { driver_id: this.selected_driver_id })
      .subscribe((res) => {
        this.showToast("success", "نجاح", "تمت اضافة السائق بنجاح");
        this.id = "";
        this.modalReference.close();
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
  }

  SupplierChanging(val) {
    this.selected_driver_id = val._id;
  }

  selectStatus(val) {
    this.selected_status_id = val;
  }

  SaveUpdateStatus(id) {
    if (window.confirm("هل أنت متأكد من الغاء الطلب؟")) {
      this.service
        .UpdateOrderData(id, { StatusId: 6, Notes: "" })
        .subscribe((res) => {
          this.showToast("success", "نجاح", "تمت الغاء الطلب بنجاح");
        },(err)=>{this.loading = false
          this.service.serverSideErrorHandler(err)
        });
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {}
}
