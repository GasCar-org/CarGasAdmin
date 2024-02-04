import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';

@Component({
  selector: 'ngx-customerMap',
  templateUrl: './customerMap.component.html',
  styleUrls: ['./customerMap.component.scss']
})
export class CustomerMapComponent implements OnInit {

  zoom: number = 8;
  public lat: Number = 24.799448
  public lng: Number = 120.979021
  label = '';
  isVisible = false;
  loading;
  user_id: {
    full_name: '',
    phone_number: ''
  }
  
  postData = {
    _id: '',
    user_id: {
      full_name: '',
      phone_number: ''
    },
    addressDetails: ''
  };

  public origin: any
  public destination: any

  constructor(private service: OrderService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    console.log('xxx')
    let id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getSingOrderData(id).subscribe((res) => {
      console.log(res)
      let response = res[appConstant.ITEMS]
      this.postData = response[0]
      this.lat = response[0]['lat'] as any
      this.lng = response[0]['lng'] as any
      this.isVisible = true;
      //this.getDirection()
      this.loading = false
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  getDirection() {
    this.origin = { lat: this.lat, lng: this.lng }
    this.destination = { lat: 31.312925, lng: 34.234762 }

    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }
}
