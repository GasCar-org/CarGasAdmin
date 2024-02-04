import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { OfferService } from '../../service/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ToasterService } from 'angular2-toaster';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { appConstant } from '../../service/_constant/appConstant';
import { Page } from '../../service/_constant/page';

@Component({
  selector: 'ngx-offerquot',
  templateUrl: './offerquot.component.html',
  styleUrls: ['./offerquot.component.scss']
})
export class OfferquotComponent extends SuperComponent implements OnInit {

  items: any[];
  itemsFilter: any[];
  subscripe: Subscription;

  page = new Page();
  rows = new Array<any>();
  cache: any = {};
  isLoading: boolean = false;
  
  constructor(
    private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
      super(route, toasterService, router);
      this.setPage({ offset: 0 });

  }


  setPage(pageInfo) {
    console.log(pageInfo)
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = 10;

    this.offer.getOfferData(pageInfo.offset).subscribe(pagedData => {
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
    }, err => {this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }


  ngOnInit() {

  }

  EditRow(event) {
    this.router.navigate(['/pages/offer/addoffer/', event['_id']]);
  }

  public deleteRow(event, index) {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      this.loading = true;
      this.offer.DeleteOfferData(event['_id']).subscribe((response) => {
        this.showToast('success','نجاح','تم حذف المنتج بنجاح')
        this.loading = false;
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      })
    }
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
      // this.offer.getSearchUserInfo(content).subscribe((res) => {
      //   this.rows = res[appConstant.ITEMS] as any[];
      //   this.isLoading = false;
      // })
    }
    else {
      this.setPage({ offset: 0 });
    }
  }
}
