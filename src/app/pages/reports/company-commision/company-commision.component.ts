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
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-company-commision',
  templateUrl: './company-commision.component.html',
  styleUrls: ['./company-commision.component.scss']
})
export class CompanyCommisionComponent implements OnInit {

  val;
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
  modalReference: NgbModalRef;
  supplier_id = ''

  constructor(private service: OrderService,
    private constant: ConstantService,
    private _driver: DriverService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private modalService: NgbModal,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.setPage(0)
  }

  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;
    this.service.rpt_getCompanyCommission(pageInfo.offset).subscribe(pagedData => {
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


  openModal(contentCategory, event) {
    this.supplier_id = event.supplier_id._id
    console.log(this.supplier_id)
    this.modalReference = this.modalService.open(contentCategory, { size: 'lg' })
  }

  SaveUpdateStatus(id) {
    if (window.confirm('هل أنت متأكد من القيمة المدخلة؟')) {
      let content = {
        supplier_id: this.supplier_id,
        totalPay: parseInt(this.val, 10)
      }
      this.service.addCompanyCommission(content).subscribe((res) => {
        this.showToast('success', 'نجاح', 'تم حفظ المعلومات بنجاح')
        this.supplier_id = ''
        this.val = '1'
        this.setPage(0)
        this.modalReference.close();
      },(err)=>{
        this.isLoading = false;
        this.service.serverSideErrorHandler(err)
      })
    }
  }
}
