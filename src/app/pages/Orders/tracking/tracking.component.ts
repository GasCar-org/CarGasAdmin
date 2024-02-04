import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { appConstant } from '../../service/_constant/appConstant';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'ngx-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  zoom: number = 12;
  public lat: Number = 24.799448
  public lng: Number = 120.979021
  labelClient = '';
  labelDriver = '';
  isVisible = false;
  loading;
  
  markerClient: marker = {
    lat: 0,
    lng: 0,
    label: ''
  }
  markerDriver: marker = {
    lat: 0,
    lng: 0,
    label: ''
  };

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
    addressDetails: '',
    driver_phone: '',
    driver_name: ''
  };

  public origin: any
  public destination: any

  constructor(private service: OrderService,
    private db2: AngularFireDatabase,
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
      this.postData.driver_phone = response[0]['driver_id']['phone_number']
      this.postData.driver_name = response[0]['driver_id']['name']
      this.markerClient.lat = response[0]['lat'];
      this.markerClient.lng = response[0]['lng'];
      this.markerClient.label = 'العميل'

      this.db2.object('/tracking/' + id).valueChanges().subscribe((x) => {
        if (x) {
          if (x['active']) {
            this.lat = x['lat']
            this.lng = x['lng']

            this.markerDriver.lat = x['lat'],
              this.markerDriver.lng = x['lng'],
              this.markerDriver.label = 'السائق'

            // this.markerDriver = m2;
            this.getDirection()
          }
        }
        this.loading = false
        this.isVisible = true;
      })
    },(err)=>{this.loading = false
      this.service.serverSideErrorHandler(err)
    })
  }

  clickedMarker(label: string) {
    this.labelClient = this.markerClient.label
    console.log(`موقع ${label}`)
  }

  clickedMarkerDriver(label: string) {
    this.labelDriver = this.markerDriver.label
    console.log(`موقع ${label}`)
  }
  getDirection() {
    this.origin = { lat: this.markerClient.lat, lng: this.markerClient.lng }
    this.destination = { lat: this.markerDriver.lat, lng: this.markerDriver.lng }
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string
}

