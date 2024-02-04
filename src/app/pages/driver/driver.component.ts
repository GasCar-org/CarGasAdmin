import { appConstant } from "../service/_constant/appConstant";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { ConstantService } from "../service/constant.service";
import { FileUploader } from "ng2-file-upload";
import { LocalDataSource } from "ng2-smart-table";
import { Subscription } from "rxjs";
import { OfferService } from "../service/offer.service";
import { SuperComponent } from "../../_components/SuperComponent/SuperComponent";
import * as moment from "moment";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { enGbLocale } from "ngx-bootstrap/locale";
import { format } from "date-fns";
import { DateFormatPipe } from "../service/pipe/date-format.pipe";
import { UserService } from "../service/user.service";
import { DatePipe } from "@angular/common";
import { DriverService } from "../service/driver.service";
import { AngularFireDatabase } from "@angular/fire/database";

const uri = appConstant.BASE_URL + "upload_file";

@Component({
  selector: "ngx-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.scss"],
})
export class DriverComponent extends SuperComponent implements OnInit {
  //uri = '/Driver/file_upload';

  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 5 });
  attachmentList: any = [];
  imagesArr = [];
  thumImage = "";

  suppliers = [];
  selected_supplier_id;

  user = {
    name: "",
    email: "",
    password: "",
    dt_dob: "",
    address: "",
    phone_number: "",
    images: [],
    image: "",
    supplier_id: "",
    car_name: "",
    car_color: "",
    car_number: "",
  };

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 30,
    },
    actions: {
      add: false,
      edit: false,
      width: 50,
    },
    columns: {
      _id: {
        title: "#",
        type: "string",
        editable: false,
        addable: false,
        filter: false,
        show: false,
      },
      image: {
        title: "الصورة",
        type: "html",
        filter: false,
        valuePrepareFunction: (image: string) => {
          return `
             <img width='70px' height='70px' src="${image}" />
        `;
        },
      },
      name: {
        title: "الاسم",
        type: "string",
      },
      phone_number: {
        title: "رقم الجوال",
        type: "string",
      },
      supplier_id: {
        title: "الشركة",
        type: "html",
        filter: true,
        valuePrepareFunction: (supplier_id: string) => {
          return supplier_id["name"];
        },
      },
      address: {
        title: "العنوان",
        type: "string",
      },
      dt_dob: {
        title: "تاريخ الميلاد",
        type: "string",
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = new DatePipe("en-EN").transform(raw, "dd-MM-yyyy");
          return formatted;
        },
      },
      isBlock: {
        title: "الحالة",
        type: "html",
        filter: true,
        valuePrepareFunction: (isBlock: Boolean) => {
          return isBlock == true ? "غير مفعل" : "فعال";
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;

  constructor(
    private service: DriverService,
    private supp: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService,
    private _userService: UserService,
    private angularFireDB: AngularFireDatabase,
    private router: Router
  ) {
    super(route, toasterService, router);
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show == false) {
        delete this.settings.columns["_id"];
      }
    }
    this._localeService.use("en");
    moment.locale("en");
    defineLocale("en", enGbLocale);
  }

  ngOnInit() {
    this.supp.getSupplierData().subscribe((response) => {
      this.suppliers = response[appConstant.ITEMS] as any;
      this.loading = false;
      this.route.params.subscribe((params: Params) => {
        this.id = params["id"] == undefined ? null : params["id"];
        this.service.getDriverInfo(this.id).subscribe((x) => {
          let response = x[appConstant.ITEMS] as any[];
          let data = response as any;
          this.user = data;
          this.imagesArr = data["images"];
          this.selected_supplier_id = data["supplier_id"]["_id"];
          this.isEdit = true;
        },(err)=>{this.loading = false
          // this.service.serverSideErrorHandler(err)
        });
      });
      this.getData();
    });
  }

  getData() {
    this.loading = true;
    let userObj = JSON.parse(localStorage.getItem("auth_user"));
    let id = userObj["supplier_id"];

    this.service.getDriverList(id).subscribe((userList) => {
      console.log(userList[appConstant.ITEMS]);
      this.items = userList[appConstant.ITEMS] as any;
      this.source.load(userList[appConstant.ITEMS] as any);
      this.loading = false;
    });
  }

  Save(product) {
    // product.category_id = this.selected_category_id
    // console.log(product,this.selected_category_id)

    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.saveAction(product);
      } else {
        console.log("fsfsfsfs");
        this.user = {
          name: product.name,
          supplier_id: this.selected_supplier_id,
          images: this.imagesArr,
          image: this.user.image,
          phone_number: product.phone_number,
          email: product.email,
          password: product.password,
          dt_dob: product.dt_dob,
          address: product.address,
          car_name: product.car_name,
          car_color: product.car_color,
          car_number: product.car_number,
        };
        console.log(this.user);
        this.service.UpdateDriverProfile(this.id, this.user).subscribe(
          (x) => {
            this.router.navigate(["/pages/users/Drivers/"]);
          },(err)=>{this.loading = false
            this.service.serverSideErrorHandler(err)
          }
        );
      }
    } else {
      this.saveAction(product);
    }
  }

  upload() {
    this.loading = true;
    if (this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
      var x: number;
      for (x = 0; x < this.uploader.queue.length; x++) {
        this.uploader.onCompleteItem = (
          item: any,
          response: any,
          status: any,
          headers: any
        ) => {
          this.service.AddImagetoServer(item.file.rawFile).subscribe((res) => {
            const url = res["url"];
            this.imagesArr.push(url);
            this.thumImage = url;
            this.showToast("success", "نجاح", "تم رقع الصورة");
            console.log(this.imagesArr);
          },(err)=>{this.loading = false
            this.service.serverSideErrorHandler(err)
          });
        };
      }
    }
    this.loading = false;
  }

  saveAction(product) {
    console.log(this.imagesArr);
    this.user = {
      name: product.name,
      supplier_id: this.selected_supplier_id,
      images: this.imagesArr,
      image: this.thumImage,
      phone_number: product.phone_number,
      email: product.email,
      password: product.password,
      dt_dob: product.dt_dob,
      address: product.address,
      car_name: product.car_name,
      car_color: product.car_color,
      car_number: product.car_number,
    };

    if (this.id) {
      this.loading = true;
      this.service.UpdateDriverProfile(this.id, this.user).subscribe(
        (x) => {
          this.resetForm();
          this.loading = false;
          this.router.navigate(["/pages/users/Drivers/"]);
        }
        ,(err)=>{this.loading = false
          this.service.serverSideErrorHandler(err)
        }
      );
    } else {
      this.loading = true;
      if (
        this.uploader.queue.length == this.imagesArr.length &&
        this.uploader.queue.length > 0
      ) {
        this.service.CreateNewDriver(this.user).subscribe(
          (x) => {
            this.uploader.clearQueue();
            this.getData();
            this.resetForm();
            this.loading = false;
            this.showToast("success", "نجاح!!", "تمت اضافة السائق بنجاح");
          },(err)=>{this.loading = false
            this.service.serverSideErrorHandler(err)
          }
        );
      } else {
        this.loading = false;
        this.showToast("error", "خطأ!!", "الرجاء رفع صور السائق");
      }
    }
  }

  onUserRowSelect(event) {
    this.router.navigate(["/pages/users/Drivers/", event.data._id]);
  }

  onDeleteConfirm(event) {
    if (window.confirm("هل أنت متأكد من حذف العنصر؟")) {
      let content = {
        isBlock: !event.data.isBlock,
      };
      const index = event.source.data.indexOf(event.data);
      // this.angularFireDB.object("driver/").remove(data);
      this.angularFireDB
        .object("/userLocation/" + event.data._id)
        .remove()
        .then((x) => {
          //delete from mongo
          this.service.deleteDriver(event.data._id).subscribe((x) => {
            this.getData();
            event.confirm.refresh();
          },(err)=>{this.loading = false
            this.service.serverSideErrorHandler(err)
          });
        });
      // this.service.BlockDriver(event.data._id, content).subscribe((res) => {
      //   console.log(res)
      //   this.getData();
      //   // event.confirm.resolve();
      //   this.source.refresh();
      // });
    } else {
      event.confirm.reject();
    }
  }

  resetForm() {
    this.user = {
      name: "",
      email: "",
      password: "",
      dt_dob: "",
      address: "",
      phone_number: "",
      images: [],
      image: "",
      supplier_id: "",
      car_name: "",
      car_color: "",
      car_number: "",
    };
  }

  SupplierChanging(val) {
    this.selected_supplier_id = val._id;
  }
}
