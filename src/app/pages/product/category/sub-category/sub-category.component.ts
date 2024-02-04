import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormatDateService } from '../../../service/custom/format-date.service';
import { switchMap, mergeMap } from 'rxjs/operators';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent extends SuperComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;

  sub_category = {
    name: '',
    category_id: ''
  };

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
      width: 25
    },
    columns: {
      _id: {
        title: '#',
        type: 'number',
        editable: false,
        addable: false,
        filter: false,
        show: false
      },
      category_id: {
        title: 'التصنيف الرئيسي',
        type: 'html',
        filter: false,
        valuePrepareFunction: (obj: any) => {
          return `<span>${obj.name}</span>`;
        },
      },
      name: {
        title: 'اسم التصنيف الفرعي',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  isEdit = false;
  cateogires = [];
  selected_category_id;

  
  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private dateFormatPipe:FormatDateService) {
      super(route, toasterService, router);
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show == false) {
        delete this.settings.columns["_id"];
      }
    }
  }



  ngOnInit() {
    this.loading = true;
    this.subscripe = this.service.getCategoryData().pipe(
      switchMap(res => {
        this.cateogires = res as any[]
        console.log(this.cateogires)
        this.loading = false;
        return this.route.params
      })).subscribe(res2 => {
        this.id = res2['id'] == undefined ? null : res2['id'];
        this.service.getSingleSubCategoryData(this.id).subscribe(x => {
          console.log(x)
          this.sub_category = x as any;
          this.loading = false;
          this.isEdit = true;
          this.selected_category_id = x['category_id']
        },(err)=>{
          // this.service.serverSideErrorHandler(err)
        });
      });
    this.getData();
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.subscripe = this.service.getSubCategoryData().subscribe(userList => {
      this.items = userList as any;
      this.source.load(userList as any);
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteSubCategoryData(event.data._id).subscribe(x => {
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      event.confirm.reject();
    }
  }


  onUserRowSelect(event) {
    this.router.navigate(['/pages/product/subcategory/', event.data._id]);
  }

  Save(category) {
    this.upload(category);
  }

  upload(category) {
    this.sub_category.name = category.name;
    this.sub_category.category_id = this.selected_category_id
    if (this.id) {
      this.service.UpdateSubCategoryData(this.id, this.sub_category).subscribe(x => {
        this.sub_category = {
          name: '',
          category_id: ''
        }
        this.router.navigate(['/pages/product/subcategory/']);
      }, (err) => {
        this.loading = false;
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      this.loading = true;
      this.service.CreateSubCategoryData(this.sub_category).subscribe(x => {
        this.sub_category = {
          name: '',
          category_id: ''
        }
        this.loading = false;
        this.getData();
      }, err => {
        this.loading = false;
        this.service.serverSideErrorHandler(err)
      });
    }
  }


  ChangingValue(val) {
    this.selected_category_id = val._id
  }

}

