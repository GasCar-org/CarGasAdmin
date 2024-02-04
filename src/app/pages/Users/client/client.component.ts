import { PagedData } from './../../service/_constant/page-data';
// import { User } from './../../service/_constant/User';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription, Observable, of } from 'rxjs';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/catch';
import { UserService } from '../../service/user.service';
import { DatePipe } from '@angular/common';
import { appConstant } from '../../service/_constant/appConstant';
import { Page } from '../../service/_constant/page';
import { map } from 'rxjs/operators';


@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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
  @ViewChild('myTable') table;
  isLoading: boolean = false;

  constructor(private service: UserService,
    private toasterService: ToasterService,
    private datePipe: DatePipe) {
    this.setPage({ offset: 0 });
  }

  ngOnInit() {

  }

  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;

    this.service.getUserInfo(pageInfo.offset).subscribe(pagedData => {
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
    },(err)=>{        this.isLoading = false;

      this.service.serverSideErrorHandler(err)
    });
  }


  ngOnDestroy() {

  }


  onDeleteConfirm(event) {
    if (window.confirm('هل أنت متأكد من حظر المستخدم؟')) {
      console.log(event)
      this.service.BlockUser(event['_id'], { isBlock: !event['isBlock'] }).subscribe(x => {
        this.showToast('success', 'نجاح', 'تم حظر المستخدم بنجاح')
      },(err)=>{        this.isLoading = false;

        this.service.serverSideErrorHandler(err)
      });
    }
  }
  onCheckProfile(event) {

  }

  getRowClass(row) { return { 'age-is-ten': row['isBlock'] == true, } }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const content = {
      full_name: val,
      phone_number: val
    }
    this.page.pageNumber = 0;
    if (val.value != '') {
      this.isLoading = true;
      this.service.getSearchUserInfo(content).subscribe((res) => {
        this.rows = res[appConstant.ITEMS] as any[];
        this.isLoading = false;
      },(err)=>{this.isLoading = false
        this.service.serverSideErrorHandler(err)
      })
    }
    else {
      this.setPage({ offset: 0 });
    }



    // const temp = this.rows.filter(function (d) {
    //   return d['phone_number'].toLowerCase().indexOf(val) !== -1 || !val;
    // });

    // this.rows = temp;
    // this.page.pageNumber = 1;
  }
}
