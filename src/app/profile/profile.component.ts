import { Component, OnInit } from '@angular/core';
import * as data from '../profileList.json'
@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  typeRole: any;
  profileList: any;
  // dataSource:any = data[<any>'default']



  constructor() { }

  ngOnInit(): void {
    this.typeRole = localStorage.getItem('token')
    this.profileList = data["default"][this.typeRole]
    this.profileList = Object.entries(this.profileList);
  }
  close() {

  }

}
