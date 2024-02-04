import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { Page } from '../../service/_constant/page';
import { OrderService } from '../../service/order.service';
import { ConstantService } from '../../service/constant.service';
import { DriverService } from '../../service/driver.service';
import { DatePipe } from '@angular/common';
import { appConstant } from '../../service/_constant/appConstant';
import { switchMap } from 'rxjs/operators';
import { ExcelService } from '../../service/excel/excel.service';

@Component({
  selector: 'ngx-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {

  @ViewChild('myTable') table;
  total;
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
  content = {}
  selected_supplier_id = ''
  selected_driver_id = ''
  selected_status_id = ''
  search = {
    dt_from: '',
    dt_to: '',
    supplier_id: '',
    driver_id: ''
  }
  suppliers = [];
  drivers = [];
  status = [];
  isLoading: boolean = false;


  constructor(private service: OrderService,
    private constant: ConstantService,
    private _driver: DriverService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private datePipe: DatePipe) {

    this.setPage({ offset: 0 });
  }

  ngOnInit() {
    this.status = [
      { id: 1, name: 'بانتظار استلام السائق للطلب' },
      { id: 2, name: 'تم استلام السائق وجاري التوصيل' },
      { id: 3, name: 'تم التوصيل' },
      { id: 4, name: 'تم استلام الزبون' },
      { id: 5, name: 'تم الغاء الطلب من الزبون ' },
      { id: 6, name: 'تم الغاء الطلب من السائق' }
    ];

    this.constant.getSupplierData()
      .pipe(switchMap(res1 => {
        this.suppliers = res1[appConstant.ITEMS] as any[];
        let userObj = JSON.parse(localStorage.getItem('auth_user'))
        let sid = userObj['supplier_id']

        return this._driver.getDriverList(sid)
      })).subscribe((_response) => {
        this.drivers = _response[appConstant.ITEMS] as any[]
      });
  }

  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;
    this.service.rpt_getOrderswithstatus(pageInfo.offset, this.content).subscribe(pagedData => {
      let _page = pagedData[appConstant.PAGINATION];
      this.total = _page.totalElements
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
    },(err)=>{
      this.isLoading = false;
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
    if (this.selected_status_id != '') {
      this.content['StatusId'] = this.selected_status_id
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
    this.selected_status_id = ''
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  ExportExcel() {
    this.excelService.exportAsExcelFile(this.rows, 'report orders with status');
  }
}
