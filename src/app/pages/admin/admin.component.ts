import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { Toast, ToasterConfig, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../service/constant.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SuperComponent } from '../../_components/SuperComponent/SuperComponent';
import { appConstant } from '../service/_constant/appConstant';
import { MessagingService } from '../service/_shared/messaging.service';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends SuperComponent implements OnInit {


  admin = {
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
    roles:[]
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
      full_name: {
        title: 'الاسم',
        type: 'string',
      },
      email: {
        title: 'البريد الكتروني',
        type: 'string',
      },
      phone_number: {
        title: 'رقم الجوال',
        type: 'string',
      },
      password: {
        title: 'كلمة المرور',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  isEdit = false;
  selectedRoles = [];
  Roles = []
  arrRoles = [];
  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router
  ) {
    super(route, toasterService, router);
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show == false) {
        delete this.settings.columns["_id"];
      }
    }
    this.Roles = [
      {name:"كل الصلاحيات"},
      {name:"ادارة مستخدمين النظام"},
      {name:"الشركات والأصناف"},
      {name:"المنتجات"},
      // {name:"الاعلانات والعروض"},
      {name:"النقاط"},
      {name:"ادارة المستخدمين"},
      {name:"ادارة الطلبات"},
      {name:"التقارير"}]
  }

  ngOnInit() {

    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] == undefined ? null : params['id'];
      if (this.id) {
        this.service.getSingleAdminData(this.id).subscribe(x => {
          this.admin = x[appConstant.ITEMS] as any;
          this.isEdit = true;
          this.loading = false;
          this.selectedRoles= x[appConstant.ITEMS]['roles'] as any[]
          // arr.forEach(element => {
          //   console.log(element)
          //   this.selectedRoles.push({name:element})
          // });
          // console.log(this.selectedRoles)
          // this.admin.roles= x['roles'] as any[]
          // this.Roles.
        },(err)=>{
          this.loading = false
          // this.service.serverSideErrorHandler(err)
        });
      }
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.subscripe = this.service.getAdminData().subscribe(userList => {
      let data = userList[appConstant.ITEMS]
      this.items = data as any;
      this.source.load(data as any);
      this.loading = false;
    },(err)=>{
      this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteAdminData(event.data._id).subscribe(x => {
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      },(err)=>{
        this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    this.router.navigate(['/pages/admin/AddAdmin/', event.data._id]);
  }


  Save(category) {
    this.upload(category)
  }

  upload(category) {
    // this.selectedRoles.forEach(element => {
    //   this.arrRoles.push(element.name)
    // });
    if (this.id) {
      this.admin.roles = this.selectedRoles
      this.service.UpdateAdminData(this.id, this.admin).subscribe(x => {
        this.admin = {
          full_name: '',
          email: '',
          password: '',
          phone_number: '',
          roles:[]
        }
        this.resetfile();
        this.router.navigate(['/pages/admin/AddAdmin/']);
      },(err)=>{
        this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      this.admin.roles = this.selectedRoles
      this.service.CreateAdminData(this.admin).subscribe(x => {
        this.admin = {
          full_name: '',
          email: '',
          password: '',
          phone_number: '',
          roles:[]
        }
        this.resetfile();
        this.getData();
      },(err)=>{
        this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  resetfile() {
    this.admin = {
      full_name: '', email: '', password: '', phone_number: '' , roles:[]
    }
  }
}
