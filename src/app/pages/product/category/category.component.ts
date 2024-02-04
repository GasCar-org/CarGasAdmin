import { FormatDateService } from './../../service/custom/format-date.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/catch'; 
import { NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../../service/_constant/appConstant';

const uri = appConstant.BASE_URL+'file_upload';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends SuperComponent implements OnInit {
  
  @ViewChild('fileUpload') fileUpload: ElementRef;

 
  category = {
    name: '',
    image: ''
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
      delete: false,
      width: 0
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
      image: {
        title: 'الصورة',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => {
          return `
             <img width='70px' height='70px' src="${image}" />
        `;
        },
      },
      name: {
        title: 'الصنف',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
  attachmentList: any = [];


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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id']; 
        this.service.getSingleCategoryData(this.id).subscribe(x => {
          this.category = x[appConstant.ITEMS] as any;
          this.isEdit = true;
          this.loading = false;
        });
        this.loading = false;
    },(err)=>{
      // this.service.serverSideErrorHandler(err)
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.subscripe = this.service.getCategoryData().subscribe(userList => {
      let data = userList[appConstant.ITEMS]
      this.items = data as any;
      this.source.load(data as any);
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteCategoryData(event.data._id).subscribe(x => {
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
    this.router.navigate(['/pages/product/category/', event.data._id]);
  }

  Save(category) {
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.upload(category);
      }
      else {
        let conent = {
          name: category.name,
          image: category.image
        }
        this.loading = true;
        this.service.UpdateCategoryData(this.id, conent).subscribe(x => {
          this.category = {
            name: '',
            image: ''
          }
          this.loading = false;
          this.router.navigate(['/pages/product/category/']);
        },err=>{this.loading = false
          this.service.serverSideErrorHandler(err)
        });
      }
    }
    else {
      this.upload(category);
    }
  }

  upload(category) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // var res = JSON.parse(response);
      // var resArr = res.filename;
      // for (let key in resArr[0]) {
      //   if (key == 'filename') {
      //     let value = resArr[0][key];
      //     this.category.image = value
      //   }
      // }
      console.log(item.file.rawFile)
        const img = item.file.rawFile
        this.category.image = img;

      this.category.name = category.name;
      if (this.id) {
        this.loading = true;
        this.service.UpdateCategoryData(this.id, this.category).subscribe(x => {
          this.category = {
            name: '',
            image: ''
          }
          this.loading = false;
          this.uploader.clearQueue();
          this.resetfile();
          this.router.navigate(['/pages/product/category/']);
        },(err)=>{
          this.loading = false
          this.service.serverSideErrorHandler(err)
        });
      }
      else {
        this.loading = true;
        this.service.CreateCategoryData(this.category).subscribe(x => {
          this.category = {
            name: '',
            image: ''
          }
          this.loading = false;
          this.uploader.clearQueue();
          this.resetfile();
          this.getData();
        },err=>{
          this.loading = false
                    this.service.serverSideErrorHandler(err)
        });
      }
    }
  }

  resetfile() {
    this.fileUpload.nativeElement.value = '';
    this.category.image = '';
  }
}
