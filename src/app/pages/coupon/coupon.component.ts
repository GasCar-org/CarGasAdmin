import { appConstant } from '../service/_constant/appConstant';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ConstantService } from '../service/constant.service';
import { FileUploader } from 'ng2-file-upload';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { OfferService } from '../service/offer.service';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import * as moment from 'moment';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { format } from 'date-fns';
import { DateFormatPipe } from '../service/pipe/date-format.pipe';
import { UserService } from '../service/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent extends SuperComponent implements OnInit {

  coupon = {
    coupon: this.makeCoupon(),
    msg: '',
    dt_from: '',
    dt_to: '',
    discount_rate: 0
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 30
    },
    actions: {
      add: false,
      edit: false,
      width: 20
    },
    columns: {
      product_id: {
        title: '#',
        type: 'string',
        editable: false,
        addable: false,
        filter: false,
        show: false
      },
      coupon: {
        title: 'الكوبون',
        type: 'string'
      },
      msg: {
        title: 'رسالة الاشعار',
        type: 'string'
      },
      dt_from: {
        title: 'من تاريخ',
        type: 'string',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
          return formatted;
        }
    },
    dt_to: {
      title: 'الى التاريخ',
      type: 'string',
      valuePrepareFunction: (date) => {
        var raw = new Date(date);

        var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
        return formatted;
      }
    },
    discount_rate: {
      title: 'نسبة الخصم',
      type: 'number'
    }
  },
};

source: LocalDataSource = new LocalDataSource();
items: any[];
users_ids = [];
subscripe: Subscription;

constructor(private service: ConstantService,
  private offer: OfferService,
  private route: ActivatedRoute,
  private toasterService: ToasterService,
  private dt_format: DateFormatPipe,
  private _localeService: BsLocaleService,
  private _userService: UserService,
  private router: Router) {
  super(route, toasterService, router);
  if (this.settings.columns["product_id"].hasOwnProperty("show")) {
    if (this.settings.columns["product_id"].show == false) {
      delete this.settings.columns["product_id"];
    }
  }
  this._localeService.use('en');
  moment.locale('en');
  defineLocale('en', enGbLocale);
}


ngOnInit() {
  this.route.params.subscribe((params: Params) => {
    this.id = params['id'] == undefined ? null : params['id'];
    this.offer.getSingCouponData(this.id).subscribe(x => {
      this.coupon = x as any;
      this.isEdit = true;
    }, err => {
      console.log(err)
      // this.service.serverSideErrorHandler(err)
    });
  });
  this.getData()
}

getData() {
  this.loading = true;
  this.offer.getCouponData().subscribe(userList => {
    this.items = userList[appConstant.ITEMS] as any;
    this.source.load(userList[appConstant.ITEMS] as any);
    this.loading = false;
  }, err => {this.loading = false
    this.service.serverSideErrorHandler(err)
  });
}

upload(_basket) {
  if (this.id) {
    this.loading = true;
    this.offer.UpdateCouponData(this.id, this.coupon).subscribe(x => {
      this.loading = false;
      this.getData()
      this.showToast('success', 'نجاح', 'تمت تعديل الكوبون بنجاح');
      this.resetForm()
    }, (err) => {
      this.loading = false;
      this.service.serverSideErrorHandler(err)
    });
  }
  else {
    this.loading = true;
    this.offer.CreateCouponData(this.coupon).subscribe(x => {
      // this._userService.getUserInfoLis().subscribe((res) => {
      //   let usr_arr = res as any[];
      //   (usr_arr as any[]).forEach(elem => {
      //     if(elem.fcmToken )
      //       this.users_ids.push(elem.fcmToken)
      //   });
        
        // console.log(this.users_ids)
        // this._userService.CreateNotificationForMultiple(this.users_ids, this.coupon).subscribe()

        this.loading = false;
        this.resetForm()
        this.getData()
        this.showToast('success', 'نجاح', 'تم الاضافة بنجاح');
      // });
    }, err => {
      this.loading = false;
      this.service.serverSideErrorHandler(err)
    });
  }
}

Save(content) {
  this.upload(content);
}


onUserRowSelect(event) {
  this.router.navigate(['/pages/Coupon/addcoupon/', event.data._id]);
}


onDeleteConfirm(event) {
  if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
    const index = event.source.data.indexOf(event.data);
    this.offer.DeleteCouponData(event.data._id).subscribe((res) => {
      console.log(res)
      event.source.data.splice(index, 1);
      event.confirm.resolve();
      this.source.refresh();
    }, err => {
      this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }
  else {
    event.confirm.reject();
  }
}

resetForm() {
  this.coupon = {
    coupon: '',
    msg: '',
    dt_from: '',
    dt_to: '',
    discount_rate: 0
  }
}
makeCoupon() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
}