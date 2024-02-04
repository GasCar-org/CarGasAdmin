import { DateFormatPipe } from './../../../service/pipe/date-format.pipe';
import { Component, OnInit } from '@angular/core';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { ConstantService } from '../../../service/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { FormatDateService } from '../../../service/custom/format-date.service';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { SupplierProduct } from '../../../../_models/supplier-product';
// import { BsDatepickerConfig } from "ngx-bootstrap";
// import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { format } from 'date-fns';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';

@Component({
  selector: 'ngx-add-supplier-product',
  templateUrl: './add-supplier-product.component.html',
  styleUrls: ['./add-supplier-product.component.scss']
})
export class AddSupplierProductComponent extends SuperComponent implements OnInit {
  // bsConfig: Partial<BsDatepickerConfig> = { containerClass: 'theme-dark-blue',showWeekNumbers: false };
  subscripe: Subscription;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  products = [];
  suppliers = [];
  buyUnits: any;
  categories = [];
  sub_categories = [];
  selected_Category;
  selected_subCategory;
  buyUnitsName: any[]
  prices: any;
  productPrices: any;
  model: any;
  myForm: FormGroup;

  priceItem = {
    buy_unit_id: '',
    buy_unit_name: '',
    price: ''
  }

  constructor(private service: ConstantService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private dateFormatPipe: FormatDateService,
    private fb: FormBuilder,
    private dt_format: DateFormatPipe,
    private _localeService: BsLocaleService) {
    super(route, toasterService, router);
    this.myForm = SupplierProduct.buildForm(fb);
    this.model = new SupplierProduct(null, null, null, null, null, null, null);
    this._localeService.use('en');
    moment.locale('en');
    defineLocale('en', enGbLocale);
  }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.myForm.get('sub_category_id').disable();
    this.myForm.get('product_id').disable();

    this.subscripe = this.service.getSupplierData()
      .pipe(switchMap(res1 => {
        this.suppliers = res1 as any[];
        return this.service.getCategoryData()
      }))
      .pipe(switchMap(res3 => {
        this.categories = res3 as any[]
        return this.service.getBuyUnitsData()
      }))
      .pipe(switchMap(res2 => {
        // this.buyUnits = res2;
        this.buyUnitsName = res2 as any

        this.myForm.get('prices') as FormArray;
        this.prices = this.myForm.get('prices') as FormArray;
        this.prices.controls = [];
        var x = res2 as any[];
        x.forEach((i: any) => {
          this.prices.push(this.createItem(i._id, i.name, ''));
        });
        return this.service.getBuyOptionsData()
      }))
      // .pipe(switchMap(res4 => {
      //   this.products = res4 as any[];
      //   return this.service.getProductData()
      // }))
      .subscribe(Response => {
        if (this.id) {
          this.loading = true;
          this.myForm.get('sub_category_id').enable();
          this.myForm.get('product_id').enable();

          this.isEdit = true;
          // this.model = Response as any
          this.service.getSingleSupplierProductData(this.id)
            .subscribe(response2 => {
              this.model = response2 as any;
              this.productPrices = response2['prices'];

              for (let control of this.prices.controls) {
                const findItem = control.controls['buy_unit_id'].value;
                if (findItem) {
                  const itemPrice = this.productPrices.find(x => x.buy_unit_id == findItem);
                  if (itemPrice) {
                    control.patchValue({
                      checked: true
                    }, { onlySelf: true });
                  }
                }
              }
              this.myForm.patchValue({ supplier_id: response2['supplier_id'], }, { onlySelf: true });
              const item = this.suppliers.find((x) => x._id == response2['supplier_id']);
              this.myForm.get('supplier_id').patchValue(item);

              this.myForm.patchValue({ category_id: response2['category_id'], }, { onlySelf: true });
              const _item = this.categories.find((x) => x._id == response2['category_id']);
              this.myForm.get('category_id').patchValue(_item);

              this.service.getSubCategoryDataByCategoryId(response2['category_id']).subscribe(res1 => {
                this.sub_categories = res1 as any[];

                this.myForm.patchValue({ sub_category_id: response2['sub_category_id'] }, { onlySelf: true });
                const _item3 = this.sub_categories.find((x) => {
                  x.ـid == response2['sub_category_id'];
                  return x;
                });

                this.myForm.get('sub_category_id').patchValue(_item3);
                this.service.getProductDataBySubCategoryId(response2['sub_category_id']).subscribe(res3 => {
                  this.products = res3 as any[]
                  this.myForm.patchValue({ product_id: response2['product_id'] }, { onlySelf: true });
                  // const _item2 = (this.products).find((x) => {
                  //   x['_id'] == response2['product_id'];
                  //   return x;
                  // });
                  (this.products).forEach(element => {
                    if(element._id == response2['product_id']){
                      console.log(element)
                      this.myForm.get('product_id').patchValue(element);
                    }
                  });
                  // console.log((this.products))
                  // console.log(response2['product_id'])
                  this.loading = false;
                });
              });
            })
        }
      });
  }

  getTrue(item) {
    if (this.isEdit && this.model.prices) {
      const x = this.productPrices.find((x) => x.buy_unit_id == item) ? true : false;
      return x;
    }
  }

  getPrice(item) {
    if (this.model.prices) {
      const itemProductPrice = this.productPrices.find((x) => x.buy_unit_id == item);
      const x = itemProductPrice ? itemProductPrice.price : '';
      return x;
    }
    else {
      return '';
    }
  }

  Save() {
    let dt = this.dt_format.transform(new Date(this.myForm.value.dt_end))

    this.myForm.value.dt_end = dt;
    this.myForm.value.supplier_id = this.myForm.value.supplier_id._id;
    this.myForm.value.category_id = this.myForm.value.category_id._id;
    this.myForm.value.sub_category_id = this.myForm.value.sub_category_id._id;
    this.myForm.value.product_id = this.myForm.value.product_id._id;
    this.myForm.value.prices = this.myForm.value.prices.filter((i) => {
      return i.checked == true;
    })
    let obj = this.myForm.value;

    if (this.myForm.value.prices.length === 0) {
      return this.showToast('error', 'خطأ!!', 'الرجاء تحديد السعر');
    }

    if (this.isEdit) {
      this.service.UpdateSupplierProductData(this.id, obj).subscribe(x => {
        this.showToast('success', 'نجاح!!', 'تمت تعديل المنتج بنجاح');
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    } else {
      this.service.CreateSupplierProductData(obj).subscribe(x => {
        this.myForm.reset()
        this.showToast('success', 'نجاح!!', 'تمت اضافة المنتج بنجاح');
        this.router.navigate(['/pages/product/addsupplierproducts']);
      }, err => {this.loading = false
        this.service.serverSideErrorHandler(err)
      });
    }
  }

  onChange(event, cat: any, price: HTMLInputElement, i) {
    if (event.target.checked) {
      this.priceItem = { buy_unit_id: cat._id, buy_unit_name: cat.name, price: price.value }
      this.model.prices.push(this.priceItem)
    }
    else {
      this.model.prices.splice(i, 1)
    }
  }
  onChangeType(event, cat: any, i) {
    this.model.prices.find((x) => x.buy_unit_id == cat._id).price = event.value;
  }

  createPrice(buy_unit_id, buy_unit_name, price): FormGroup {
    return this.fb.group({
      buy_unit_id: buy_unit_id,
      buy_unit_name: buy_unit_name,
      price: price
    })
  }

  onChangeCheck(event, $index) {
    let items = this.myForm.get('prices') as FormArray;
    if (event.target.checked) {
      items.at($index).patchValue({ 'checked': true });
    } else {
      items.at($index).patchValue({ 'checked': false });
    }
  }

  createItem(buy_unit_id, buy_unit_name, price): FormGroup {
    return this.fb.group({
      buy_unit_id: buy_unit_id,
      buy_unit_name: buy_unit_name,
      price: price,
      checked: false
    });

  }

  selectCategory(item) {
    this.myForm.get('category_id').valueChanges

    this.loading = true
    this.service.getSubCategoryDataByCategoryId(item._id).subscribe((res) => {
      this.sub_categories = res as any
      if (this.sub_categories.length > 0) {
        this.myForm.get('sub_category_id').enable();
      } else {
        this.myForm.controls['sub_category_id'].setValue('')
      }
      this.loading = false
    })
  }

  selectSubCategory(item) {
    this.myForm.get('sub_category_id').valueChanges

    this.loading = true
    this.service.getProductDataBySubCategoryId(item._id).subscribe((res) => {
      this.products = res as any[]
      if (this.products.length > 0) {
        this.myForm.get('product_id').enable();
      } else {
        this.myForm.controls['product_id'].setValue('')
      }
      this.loading = false
    })
  }

  get getPrices() {
    return this.myForm.get('prices') as FormArray;
  }
}