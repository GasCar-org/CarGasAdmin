import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { Page } from '../../service/_constant/page';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import * as moment from 'moment';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { format } from 'date-fns';
import { DateFormatPipe } from '../../service/pipe/date-format.pipe';
import { appConstant } from '../../service/_constant/appConstant';
import { OrderService } from '../../service/order.service';
import { DriverService } from '../../service/driver.service';

@Component({
  selector: 'ngx-tunck-order',
  templateUrl: './tunck-order.component.html',
  styleUrls: ['./tunck-order.component.scss']
})
export class TunckOrderComponent extends SuperComponent implements OnInit {
  
  @ViewChild('myTable') table: any;
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
  label = 'Client Location';

  selected_driver_id;
  selected_status_id;
  drivers = [];
  cateogires = [];
  Notes = ''
  isVisible = false
  constructor(private service: OrderService,
    private driver: DriverService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private modalService: NgbModal,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService,
    private router: Router) {
    super(route, toasterService, router);
    this._localeService.use('en');
    moment.locale('en');
    defineLocale('en', enGbLocale);
  }


  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;

    let content = {
      id: this.supplier_id
    }

    this.service.getTunckOrders(this.page.pageNumber).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION];
      console.log(_page)
      if (_page.pageNumber != _page.totalPages) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
      else if (_page.totalPages == 0) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
      else {
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.isLoading = false;
      }
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0 })
  }

  EditRow(event) {
    //this.router.navigate(['/pages/product/addsupplierproducts/', event['_id']]);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const content = {
      full_name: val,
      phone_number: val
    }
    this.page.pageNumber = 0;
    if (val.value != '') {
      this.isLoading = true;

      let userObj = JSON.parse(localStorage.getItem('auth_user'))
      let id = userObj['supplier_id']

      this.service.getOrderSearchData(id,content, 0).subscribe((res) => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      })
    }
    else {
      this.setPage({ offset: 0 });
    }
  }

  openModal(contentCategory, event) {
    this.isEdit = false
    this.service.getSingOrderData(event['_id']).subscribe((res) => {
      console.log(res)
      let response = res[appConstant.ITEMS]
      this.postData = response[0]
      this.rowsItems = response[0]['items'] as any[]
      this.modalReference = this.modalService.open(contentCategory, {size:'lg'})
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }
  openModal2(contentCategory, event) {
    this.isEdit = false
    this.id = event['_id']
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let sid = userObj['supplier_id']

    this.driver.getDriverList(sid).subscribe((res) => {
      console.log(res)
      this.drivers = res[appConstant.ITEMS] as any;
      this.loading = false;
      this.modalReference = this.modalService.open(contentCategory)
    })
  }

  openModal3(contentStatus, event) {
    this.id = event['_id']
    this.cateogires = [
      // { id: 1, name: 'بانتظار استلام السائق للطلب' },
      { id: 2, name: ' تم استلام السائق وجاري التوصيل' },
      { id: 3, name: 'تم التوصيل' },
      // { id: 4, name: ' تم استلام الزبون' },
      // { id: 5, name: 'تم الغاء الطلب من الزبون' },
      // { id: 6, name: 'تم الغاء الطلب من السائق' },
      { id: 7, name: 'تم الغاء الطلب من الادارة' },
      // { id: 8, name: 'تم الغاء الطلب من العميل' }
    ];
    this.modalReference = this.modalService.open(contentStatus)
  }


  close(content) {
    this.modalReference.close();
    this.id = ''
  }


  SaveOrderDriver(event) {
    this.service.UpdateOrderDriverData(this.id, { driver_id: this.selected_driver_id }).subscribe((res) => {
      this.showToast('success', 'نجاح', 'تمت اضافة السائق بنجاح')
      this.id = '';
      this.modalReference.close();
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  SupplierChanging(val) {
    this.selected_driver_id = val._id;
  }

  selectStatus(val){
    console.log(val)
    this.selected_status_id = val
  }

  SaveUpdateStatus() {
    this.service.UpdateOrderData(this.id, { StatusId: this.selected_status_id, Notes: this.Notes }).subscribe((res) => {
      this.showToast('success', 'نجاح', 'تمت تعديل حالة الطلب بنجاح')
      this.id = '';
      this.setPage({ offset: 0 })
      this.modalReference.close();
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  
  // SaveUpdateCategory(event) {
  //   this.service.UpdateOrderData(event['_id'], { StatusId: 2, Notes: this.Notes }).subscribe((x) => {
  //     this.setPage({ offset: 0 })
  // })

    //   this.service.AddDiscount(this.id, this.postData).subscribe((res) => {
    //     this.postData = {
    //       isOffer: false,
    //       dt_begin: '',
    //       dt_end: '',
    //       discount_rate: 0.0
    //     }
    //     this.modalReference.close();
    //     this.showToast('success', 'نجاح', 'تمت اضافة الخصم بنجاح')
    //   })
    // }
    // delete(contentCategory) {
    //   this.postData = {
    //     dt_begin: '',
    //     dt_end: '',
    //     isOffer: false,
    //     discount_rate: 0.0
    //   }
    //   this.service.AddDiscount(this.id, this.postData).subscribe((res) => {
    //     this.modalReference.close();
    //     this.showToast('success', 'نجاح', 'تمت اضافة الخصم بنجاح')
    //   })
  // }
}
