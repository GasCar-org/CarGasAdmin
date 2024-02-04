import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { appConstant } from '../../service/_constant/appConstant';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'ngx-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.scss']
})
export class DriverMapComponent implements OnInit {

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


  markerDriver: marker = {
    lat: 0,
    lng: 0,
    label: ''
  };

  locations_marker: marker[] = []
  public origin: any
  public destination: any
  marker: any[]
  constructor(private service: OrderService,
    private route: ActivatedRoute,
    private db2: AngularFireDatabase,
    private router: Router) {
  }

  ngOnInit() {
    this.db2.list('/userLocation/').valueChanges().subscribe((x) => {
      if (x) {
        // console.log(x)
        let userObj = JSON.parse(localStorage.getItem('auth_user'))
        let id = userObj['supplier_id']
        
        this.locations_marker = []
        x.forEach(element => {
          if (element['supplier_id'] == id) {
            let location = element['l']
            let content = {
              lat: location[0],
              lng: location[1],
              name: element['driverName'],
              phone: element['driverPhone']
            };
            this.locations_marker.push(content)
          }
        });
        this.isVisible = true;
        console.log(this.locations_marker)
        // this.lat = x['lat']
        // this.lng = x['lng']

        // this.markerDriver.lat = x['lat'],
        // this.markerDriver.lng = x['lng'],
        // this.markerDriver.label = 'السائق'

      }
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
interface marker {
  lat: number;
  lng: number;
  label?: string
}

