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
  selector: 'ngx-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent extends SuperComponent implements OnInit {
  
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

    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let sid = userObj['supplier_id']

    this.service.getRatedOrders(sid,this.page.pageNumber).subscribe(pagedData => {
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

  close(content) {
    this.modalReference.close();
    this.id = ''
  }


  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
    this.service.updateRate(row['_id'],'').subscribe((res)=>{
        
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
