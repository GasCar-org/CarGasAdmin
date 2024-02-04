import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { DriverService } from '../../service/driver.service';
import { appConstant } from '../../service/_constant/appConstant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  loading = false;
  messages: any[] = [];
  selected_driver_id;
  drivers = [];
  Subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private driver: DriverService,
    private db2: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.loading = true;
    let userObj = JSON.parse(localStorage.getItem('auth_user'))
    let sid = userObj['supplier_id']
    this.driver.getDriverList(sid).subscribe((res) => {
      console.log(res)
      this.drivers = res[appConstant.ITEMS] as any;
      this.loading = false;
    })
  }

  SupplierChanging(val) {
    this.selected_driver_id = val._id;
    this.loading = true;
    this.Subscription = this.db2.list('/messages/' + this.selected_driver_id).valueChanges().subscribe((x) => {
      this.messages = x as any;
      console.log(x)
    })
    this.loading = false
  }

  sendMessage(event) {
    var raw = new Date();
    var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
    let _message = {
      text: event.message,
      // date: formatted,
      type: 'text',
      reply: false,
      User: {
        User: 'Admin',
        Avatar: '',
      }
    }

    
    this.messages.push(_message); 
    this.db2.list('/messages/' + this.selected_driver_id).push(_message)
  }
}