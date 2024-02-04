import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ConstantService } from '../service/constant.service';
import { FileUploader } from 'ng2-file-upload';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import { OfferService } from '../service/offer.service';
import { appConstant } from '../service/_constant/appConstant';
const uri = '/product/category/file_upload';

@Component({
  selector: 'ngx-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent extends SuperComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;

  suppliers = [];
  selected_supplier_id;

  points = {
    supplier_id: '',
    point_price: 0,
    min_value: 0,
    max_value: 0,
    points: 0
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
      min_value: {
        title: 'الحد الأدنى',
        type: 'string',
      },
      max_value: {
        title: 'الحد الأعلى',
        type: 'string',
      },
      points: {
        title: 'النقاط',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  isEdit = false;

  constructor(private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);
  }


  ngOnInit() {
    this.loading = true
    this.service.getSupplierData().subscribe((response) => {
      this.suppliers = response[appConstant.ITEMS] as any
      this.loading = false

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.isEdit = true;
        this.loading = true;
        this.offer.getSingPointData(this.id).subscribe((Response) => {
          const res = Response[appConstant.ITEMS] as any
          this.points.point_price = res['point_price']
          this.points.supplier_id = res['supplier_id']
          // const arr = res['Points'] as any[]
          // arr.forEach(element => {
          //   const _point = {
          //     min: element.min_value,
          //     max: element.max_value,
          //     points: element.points
          //   }
          //   console.log(element)
          //   this.points.Points.push(_point)
          // });
          this.source.load(res as any[]);
          this.loading = false
        })
      }
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  SupplierChanging(val) {
    this.selected_supplier_id = val._id;
  }

  upload() {
    console.log(this.points)
    this.points.supplier_id = this.selected_supplier_id
    if (this.id) {
      this.offer.UpdatePointtData(this.id, this.points).subscribe(x => {
        this.resetForm()
        this.router.navigate(['/pages/Coupon/PointsManage']);
      }, (err) => {this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      this.loading = true;
      this.offer.CreatePointData(this.points).subscribe(x => {
        this.resetForm()
        this.loading = false;
        this.showToast('success', 'نجاح', 'تمت اضافة النقاط بنجاح');
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  tempAdd(content) {
    // let ponits = {
    //   min_value: this.points_data.min_value,
    //   max_value: this.points_data.max_value,
    //   points: this.points_data.points
    // }

    // this.points.Points.push(ponits)
    // this.source.load(this.points.Points as any);
    // this.showToast('warning', 'نجاح !!', 'تمت اضافة المعايير الى الشركة .. الرجاء تأكيد المعايير بعد الانتهاء عن طريق الضغط على زر حفظ الملومات')
  }

  Save(content) {
    this.upload();
  }

  onDeleteConfirm(event) {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      // this.points.Points.splice(index, 1);
      event.source.data.splice(index, 1);
      event.confirm.resolve();
    }
    else {
      event.confirm.reject();
    }
  }

  resetForm() {
    this.points = {
      supplier_id: '',
      point_price: 0,
      min_value: 0,
      max_value: 0,
      points: 0
    }
    
    this.selected_supplier_id = ''
  }
}