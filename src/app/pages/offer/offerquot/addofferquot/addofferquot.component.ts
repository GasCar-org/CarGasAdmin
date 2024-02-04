import { appConstant } from './../../../service/_constant/appConstant';
import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../../service/constant.service';
import { OfferService } from '../../../service/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperComponent } from '../../../../_components/SuperComponent/SuperComponent';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-addofferquot',
  templateUrl: './addofferquot.component.html',
  styleUrls: ['./addofferquot.component.scss']
})
export class AddofferquotComponent extends SuperComponent implements OnInit {

  products: any;
  suppliers = [];
  selected_supplier_id;
  selected_product_id;
  selected_supplier_prod_to_send_in_edit;

  offerObj = {
    supplier_id: '',
    product_id: '',
    new_price: '',
    qty: '',
  }

  constructor(private service: ConstantService,
    private offer: OfferService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router) {
    super(route, toasterService, router);

  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loading = true
    this.service.getSupplierData().subscribe((response) => {
      this.suppliers = response as any
      this.loading = false
      if (this.id) {
        this.isEdit = true;
        this.loading = true
        this.offer.getSingOfferData(this.id).subscribe((res) => {
          const json = res[appConstant.ITEMS] as any;
          this.offerObj = json
          this.selected_supplier_id = json['supplier_id']
          this.service.getsupplierproductsBySupplierId(this.selected_supplier_id).subscribe((res) => {
            this.products = res[appConstant.ITEMS] as any[]
            console.log(res[appConstant.ITEMS] as any[])

            this.service.getsupplierproductsBySupplierId(this.selected_supplier_id).subscribe((res2) => {
              this.products = res2[appConstant.ITEMS] as any[]
              console.log(json['product_id']['_id'])
              // let selectedId = this.products.find(x => x.product_id._id == json['product_id']['_id'])
              this.selected_product_id = json['product_id']['_id']
              // this.selected_supplier_prod_to_send_in_edit = json['product_id']['_id']
            },(err)=>{this.loading = false
              this.service.serverSideErrorHandler(err)
            });
          },(err)=>{this.loading = false
            this.service.serverSideErrorHandler(err)
          });
          this.loading = false
        });
      }
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  Save(content) {
    console.log(content)
    this.offerObj.product_id = this.selected_product_id;
    this.offerObj.supplier_id = this.selected_supplier_id

    if (this.isEdit) {
      this.loading = true
      this.offer.UpdateOfferData(this.id, this.offerObj).subscribe((res) => {
        this.loading = false
        this.router.navigate(['/pages/offer/offer']);
      }, (err) => {this.loading = false
        this.service.serverSideErrorHandler(err)
      })
    }
    else {
      this.loading = true
      this.offer.CreateOfferData(this.offerObj).subscribe((res) => {
        this.loading = false
        this.offerObj = {
          supplier_id: '',
          product_id: '',
          new_price: '',
          qty: '',
        }
        this.showToast('success', 'نجاح', 'تمت اضافة المنتج الى قائمة باقات التوفير')
      }, (err) => {this.loading = false
        this.service.serverSideErrorHandler(err)
      })
    }
  }

  SupplierChanging(val) {
    this.selected_supplier_id = val._id;
    this.loading = true
    this.service.getsupplierproductsBySupplierId(val._id).subscribe((res) => {
      this.products = res[appConstant.ITEMS] as any[]
      this.loading = false
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    });
  }

  ProductChanging(val) {
    console.log(val.product_id._id)
    // this.selected_supplier_prod_to_send_in_edit = val.product_id._id;
    this.selected_product_id = val._id;
  }
}
