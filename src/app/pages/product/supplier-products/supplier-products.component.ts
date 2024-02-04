import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../service/constant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../../service/_constant/appConstant';
import { Page } from '../../service/_constant/page';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { format } from 'date-fns';
import { DateFormatPipe } from '../../service/pipe/date-format.pipe';

@Component({
  selector: 'ngx-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent extends SuperComponent implements OnInit {
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  suppliers;
  supplier_id;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  page = new Page();
  rows = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;
  modalReference: NgbModalRef;

  postData = {
    isOffer: false,
    dt_begin: '',
    dt_end: '',
    discount_rate: 0.0
  }
  constructor(private service: ConstantService,
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

    this.service.getSupplierProductBySeacrhData(content, this.page.pageNumber).subscribe(pagedData => {
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
  this.loading = true;
  this.service.getSupplierData().subscribe(res1 => {
    this.loading = false;
    this.suppliers = res1 as any[];
  },(err)=>{this.loading = false
    this.service.serverSideErrorHandler(err)
  });
}

EditRow(event) {
  this.router.navigate(['/pages/product/addsupplierproducts/', event['_id']]);
}

SupplierChange(_selected) {
  this.supplier_id = _selected._id
  this.setPage({ offset: 0 })
}


updateFilter(event) {
  const val = event.target.value.toLowerCase();
  const content = {
    name: val,
    id: this.supplier_id
  }
  this.page.pageNumber = 1;
  if (val.value != '') {
    this.isLoading = true;
    this.service.getSupplierProductSearchProductData(content).subscribe((res) => {
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

onDeleteConfirm(val) {
  if (window.confirm('هل أنت متأكد من حذف المنتج؟')) {
    this.service.DeleteSupplierProductData(val['_id']).subscribe(x => {
      this.setPage({ offset: 0 })
      this.showToast('success', 'نجاح', 'تم حذف المنتج بنجاح')
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }
}
Search() {
  this.setPage({ offset: 0 })
}

openModal(contentCategory, event) {
  this.id = event['_id']
  this.isEdit = false
  this.postData = {
    isOffer: false,
    dt_begin: '',
    dt_end: '',
    discount_rate: 0.0
  }
  this.service.getSingleSupplierProductData(this.id).subscribe((res) => {
    console.log(res)
    if (res['isOffer'] == true) {
      this.isEdit = true
      this.postData.discount_rate = res['discount_rate']
      this.postData.dt_begin = res['dt_begin']
      this.postData.dt_end = res['dt_end']
      this.postData.isOffer = res['isOffer']
    }
    this.modalReference = this.modalService.open(contentCategory, { size: 'lg' })
  },(err)=>{
    // this.service.serverSideErrorHandler(err)
  })
}
close(content) {
  this.modalReference.close();
}

SaveUpdateCategory(contentCategory) {

  this.service.AddDiscount(this.id, this.postData).subscribe((res) => {
    this.postData = {
      isOffer: false,
      dt_begin: '',
      dt_end: '',
      discount_rate: 0.0
    }
    this.modalReference.close();
    this.showToast('success', 'نجاح', 'تمت اضافة الخصم بنجاح')
  },(err)=>{this.loading = false
    this.service.serverSideErrorHandler(err)
  })
}
delete (contentCategory) {
  this.postData = {
    dt_begin: '',
    dt_end: '',
    isOffer: false,
    discount_rate: 0.0
  }
  this.service.AddDiscount(this.id, this.postData).subscribe((res) => {
    this.modalReference.close();
    this.showToast('success', 'نجاح', 'تمت اضافة الخصم بنجاح')
  },(err)=>{this.loading = false
    this.service.serverSideErrorHandler(err)
  })
}
}
