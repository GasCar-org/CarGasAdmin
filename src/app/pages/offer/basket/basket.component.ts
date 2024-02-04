import { Component, OnInit } from '@angular/core';
import { SuperComponent } from '../../../_components/SuperComponent/SuperComponent';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ToasterService } from 'angular2-toaster';
import { OfferService } from '../../service/offer.service';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends SuperComponent implements OnInit {


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
      image: {
        title: 'الصورة',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => {
          return `<img width='70px' height='70px' src="${image}" />`;
        },
      },
      name: {
        title: 'اسم السلة',
        type: 'string',
      },
      price: {
        title: 'السعر',
        type: 'string',
      },
      products: {
        title: 'المنتجات',
        type: 'html',
        filter: false,
        valuePrepareFunction: (products: any) => {
          return `<span>${products.length}</span>`;
        }
      },
      createAt: {
        title: 'تاريخ الاضافة',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;


  constructor(private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
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
      this.loading = false;
    });
    this.getData()
  }

  ngOnDestroy() {
    this.subscripe.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.subscripe = this.offer.getBasketData().subscribe(userList => {
      this.items = userList[appConstant.ITEMS] as any;
      this.source.load(userList[appConstant.ITEMS] as any);
      this.loading = false;
    }, err => {this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.offer.DeleteBaskettData(event.data._id).subscribe(x => {
        event.source.data.splice(index, 1);
        event.confirm.resolve();
        this.source.refresh();
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
    else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    this.router.navigate(['/pages/basket/addbasket/', event.data._id]);
  }
}
