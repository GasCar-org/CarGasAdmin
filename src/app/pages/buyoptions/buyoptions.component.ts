import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { ConstantService } from '../service/constant.service';

@Component({
  selector: 'ngx-buyoptions',
  templateUrl: './buyoptions.component.html',
  styleUrls: ['./buyoptions.component.scss']
})
export class BuyoptionsComponent implements OnInit {

  posts :any;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
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
      title: 'الاجراءات'
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
      name: {
        title: 'العنوان',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  lastID: number;
  subscripe:Subscription;

  constructor(private service:ConstantService) {
    if (this.settings.columns["_id"].hasOwnProperty("show")) {
      if (this.settings.columns["_id"].show ==false) {
          delete this.settings.columns["_id"];
      }
    }
  }

  ngOnInit() {
     this.getData()
  }

  ngOnDestroy(){
    this.subscripe.unsubscribe();
  }

  getData(){
   this.subscripe =  this.service.getBuyOptionsData().subscribe(userList => {
      this.items = userList as any;
      this.source.load(userList as any);
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    });
  }

  onDeleteConfirm(event): void 
  {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) 
    {
      const index = event.source.data.indexOf(event.data);
      this.service.DeleteBuyOptionsData(event.data._id).subscribe(x=>{
        console.log(x);
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      },(err)=>{
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      event.confirm.reject();
    }
  }

  onEdit(event) 
  {
   let conent = {
      name: event.newData.name
    }    

    this.service.UpdateBuyOptionsData(event.data._id,conent).subscribe(x=>{
      event.confirm.resolve(event.newData);
      this.source.refresh();
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    });
  }

  onCreate(event) 
  {
   let conent = {
      name: event.newData.name
    }       
    this.service.CreateBuyOptionsData(conent).subscribe(x=>{
      console.log(x);
      event.confirm.resolve();
      this.getData();
    },(err)=>{
      this.service.serverSideErrorHandler(err)
    });
  }
}
