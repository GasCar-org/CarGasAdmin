import { appConstant } from './../../../service/_constant/appConstant';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../../service/constant.service';
import { FileUploader } from 'ng2-file-upload';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';
import { OfferService } from '../../../service/offer.service';
const uri = '/product/category/file_upload';

@Component({
  selector: 'ngx-addbasket',
  templateUrl: './addbasket.component.html',
  styleUrls: ['./addbasket.component.scss']
})
export class AddbasketComponent extends SuperComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;

  cateogires = [];
  products: any;
  suppliers = [];
  sub_cateogires = [];

  selected_category_id;
  selected_sub_category_id;
  selected_supplier_id;
  selected_product_id;
  selected_product;
  qty = '';

  basket = {
    name: '',
    image: '',
    price: '',
    supplier_id: '',
    products: []
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
      product_id: {
        title: '#',
        type: 'string',
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
        }
      },
      name: {
        title: 'اسم المنتج',
        type: 'string',
      },
      qty: {
        title: 'الكمية',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  items: any[];
  subscripe: Subscription;
  uploader: FileUploader = new FileUploader({ url: uri, queueLimit: 1 });
  attachmentList: any = [];
  isEdit = false;

  constructor(private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);
    if (this.settings.columns["product_id"].hasOwnProperty("show")) {
      if (this.settings.columns["product_id"].show == false) {
        delete this.settings.columns["product_id"];
      }
    }
  }


  ngOnInit() {
    this.loading = true
    this.service.getSupplierData().subscribe((response) => {
      this.suppliers = response as any
      this.service.getCategoryData().subscribe((res) => {
        this.cateogires = res as any[]
        this.loading = false;

        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
          this.isEdit = true;
          this.loading = true;
          this.offer.getSingBasketData(this.id).subscribe((Response) => {
            const res = Response[appConstant.ITEMS] as any
            this.basket.image = res['image']
            this.basket.name = res['name']
            this.basket.price = res['price']
            this.basket.supplier_id = res['supplier_id']
            this.selected_supplier_id = res['supplier_id']
            const arr = res['products'] as any[]
            arr.forEach(element => {
              const basket = {
                product_id: element.product_id._id,
                name: element.product_id.name,
                image: element.product_id.image,
                qty: element.qty
              }
              console.log(element)
              this.basket.products.push(basket)
            });
            this.source.load(this.basket.products as any[]);
            this.loading = false
          }, err => {this.loading = false
            this.service.serverSideErrorHandler(err)
          })
        }
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  SupplierChanging(val) {
    this.selected_supplier_id = val._id;
  }

  CategoryChanging(val) {
    this.selected_category_id = val._id;
    this.loading = true;
    this.service.getSubCategoryDataByCategoryId(val._id).subscribe((res) => {
      this.sub_cateogires = res as any[]
      this.loading = false;
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  SubCategoryChanging(item) {
    this.selected_sub_category_id = item._id
    this.loading = true
    this.service.getSupplierProductBySubCategory(item._id, this.selected_supplier_id).subscribe((res) => {
      const response = res[appConstant.ITEMS] as any[]
      this.products = response
      this.loading = false
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  ProductChanging(item) {
    this.selected_product_id = item.product_id._id
    this.selected_product = item.product_id
    console.log(item)
  }

  upload(_basket) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(item.file.rawFile)
      this.service.AddImagetoServer(item.file.rawFile).subscribe((res) => {
        const url = res['result']['url']
        this.basket.image = url;


        this.basket.name = _basket.name
        this.basket.supplier_id = this.selected_supplier_id
        this.basket.price = _basket.price

        if (this.id) {
          this.offer.UpdateBaskettData(this.id, this.basket).subscribe(x => {
            this.resetForm()
            this.uploader.clearQueue();
            this.router.navigate(['/pages/basket/basket']);
          }, (err) => {this.loading = false
            this.service.serverSideErrorHandler(err)
          });
        }
        else {
          this.loading = true;
          this.offer.CreateBasketData(this.basket).subscribe(x => {
            this.resetForm()
            this.loading = false;
            this.uploader.clearQueue();
            this.resetfile();
            this.showToast('success', 'نجاح', 'تمت اضافة السلة بنجاح');
          }, err => {this.loading = false
            this.service.serverSideErrorHandler(err)
          });
        }
      },(err)=>{this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  resetfile() {
    this.fileUpload.nativeElement.value = '';
    this.basket.image = '';
  }

  tempAdd(content) {
    let basketProduct = {
      product_id: this.selected_product._id,
      name: this.selected_product.name,
      image: this.selected_product.image,
      qty: content
    }

    this.basket.products.push(basketProduct)
    this.source.load(this.basket.products as any);
    this.qty = '0';
    this.showToast('warning', 'نجاح !!', 'تمت اضافة المنتج الى السلة .. الرجاء اضافة السلة بعد الانتهاء عن طريق الضغط على زر حفظ الملومات')
  }

  Save(content) {
    console.log(content)
    if (this.id) {
      if (this.uploader.queue.length > 0) {
        this.upload(content);
      }
      else {

        let conent = {
          name: content.name,
          image: content.image,
          supplier_id: this.selected_supplier_id,
          price: content.price,
          products: this.basket.products
        }
        console.log(content)
        this.offer.UpdateBaskettData(this.id, conent).subscribe(x => {
          this.router.navigate(['/pages/basket/basket']);
        }, err => {this.loading = false
          this.service.serverSideErrorHandler(err)
        });
      }
    }
    else {
      this.upload(content);
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('هل أنت متأكد من حذف العنصر؟')) {
      const index = event.source.data.indexOf(event.data);
      this.basket.products.splice(index, 1);
      event.source.data.splice(index, 1);
      event.confirm.resolve();
    }
    else {
      event.confirm.reject();
    }
  }

  resetForm() {
    this.basket = {
      name: '',
      image: '',
      price: '',
      supplier_id: '',
      products: []
    }
    this.selected_supplier_id = ''
    this.selected_product_id = ''
    this.selected_category_id = ''
    this.selected_sub_category_id = ''
  }
}