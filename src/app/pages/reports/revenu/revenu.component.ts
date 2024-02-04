import { DriverService } from './../../service/driver.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { appConstant } from '../../service/_constant/appConstant';
import { DatePipe } from '@angular/common';
import { ToasterService, BodyOutputType, ToasterConfig, Toast } from 'angular2-toaster';
import { OrderService } from '../../service/order.service';
import { Page } from '../../service/_constant/page';
import { ConstantService } from '../../service/constant.service';
import { switchMap } from 'rxjs/operators';
import { ExcelService } from '../../service/excel/excel.service';

@Component({
  selector: 'ngx-revenu',
  templateUrl: './revenu.component.html',
  styleUrls: ['./revenu.component.scss']
})
export class RevenuComponent implements OnInit {

  @ViewChild('myTable') table;

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
    this.toasterService.popAsync(toast);
  }

  page = new Page();
  rows = new Array<any>();
  cache: any = {};
  sum = 0;
  selected_supplier_id = ''
  selected_driver_id = ''
  search = {
    dt_from: '',
    dt_to: '',
    supplier_id: '',
    driver_id: ''
  }
  suppliers = [];
  drivers = [];
  isLoading: boolean = false;
 content = {}


  constructor(private service: OrderService,
    private constant: ConstantService,
    private _driver: DriverService,
    private toasterService: ToasterService,
    private excelService:ExcelService,
    private datePipe: DatePipe) {
    this.setPage({ offset: 0 });
  }

  ngOnInit() {
    this.constant.getSupplierData()
      .pipe(switchMap(res1 => {
        this.suppliers = res1[appConstant.ITEMS] as any[];
        let userObj = JSON.parse(localStorage.getItem('auth_user'))
        let sid = userObj['supplier_id']

        return this._driver.getDriverList(sid)
      })).subscribe((_response) => {
        console.log(_response)
        this.drivers = _response[appConstant.ITEMS] as any[]
      });
  }

  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;
    this.service.rpt_getRevenu(pageInfo.offset, this.content).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION];
      console.log(_page)
      if (_page.pageNumber != _page.totalPages) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.sum = pagedData[appConstant.SUM] as any;
        this.isLoading = false;
      }
      else if (_page.totalPages == 0) {
        this.page = _page
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.sum = pagedData[appConstant.SUM] as any;
        this.isLoading = false;
      }
      else {
        let _rows = pagedData[appConstant.ITEMS] as any[];
        this.rows = _rows
        this.sum = pagedData[appConstant.SUM] as any;
        this.isLoading = false;
      }
    },(err)=>{        this.isLoading = false;

      this.service.serverSideErrorHandler(err)
    });
  }


  ngOnDestroy() {

  }

  Save() {
    console.log(this.selected_supplier_id)
    if (this.selected_supplier_id != '') {
      this.content['supplier_id'] = this.selected_supplier_id
    }
    if (this.selected_driver_id != '') {
      this.content['driver_id'] = this.selected_driver_id
    }
    if (this.search.dt_from != '') {
      this.content['dt_start'] = this.search.dt_from
    }
    if (this.search.dt_to != '') {
      this.content['dt_end'] = this.search.dt_to
    }

    this.setPage({ offset: 0 });
  }

  reset() {
    this.search = {
      dt_from: '',
      dt_to: '',
      supplier_id: '',
      driver_id: ''
    }
    this.selected_driver_id = ''
    this.selected_supplier_id = ''
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  
  summaryForProp2() {
    return this.sum.toFixed(2);
    // return this.rows.map(row => row['Total'])
    //   .reduce((res, cell) => res + cell, 0);
  }

}
