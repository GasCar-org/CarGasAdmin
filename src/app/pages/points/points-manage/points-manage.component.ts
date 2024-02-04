import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/catch';
import { OfferService } from '../../service/offer.service';
import { appConstant } from '../../service/_constant/appConstant';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'ngx-points-manage',
  templateUrl: './points-manage.component.html',
  styleUrls: ['./points-manage.component.scss']
})
export class PointsManageComponent implements OnInit {
  loading;
  id;
  supplier_id;
  suppliers:any;

  supplier = {
    name: '',
    image: '',
    details: ''
  };

  dataSource = new MatTableDataSource();
  displayedColumns: string[];
  items: any[];
  subscripe: Subscription;

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

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private offer : OfferService,
    private router: Router) {
   
  }

  ngOnInit() {
    this.loading = true;
      this.service.getSupplierData().subscribe(x => {
        this.suppliers = x[appConstant.ITEMS] as any;
        this.loading = false;
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  getData(){
    this.loading = true;
     this.offer.getPointData(this.supplier_id).subscribe(userList => {
      this.items = userList[appConstant.ITEMS] as any;
      this.displayedColumns = ['supplier_id', 'point_price' , 'min_value' , 'max_value','points', 'options'];
      this.dataSource = new MatTableDataSource(this.items);
      this.loading = false;
    }, err => {this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }
  
  Search(){
    this.getData();
  }

  SupplierChange(_selected) {
    this.supplier_id = _selected._id
    this.getData();
  }

  ngOnDestroy() {
    // this.subscripe.unsubscribe();
  }

  public deleteRow(itemId, index) {
    console.log(itemId, index)
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      this.loading = true;
      this.offer.DeletePointData(itemId).subscribe((response) => {
        this.items.splice(index, 1);
        this.dataSource = new MatTableDataSource<Element>(this.items);
        this.loading = false;
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      })
    }
  }
}
