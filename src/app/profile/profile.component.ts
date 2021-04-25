import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as data from '../profileList.json'
@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  typeRole: any;
  profileList: any;
  breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  // dataSource:any = data[<any>'default']



  constructor(private dbService: NgxIndexedDBService) {

  }

  ngOnInit(): void {
    this.typeRole = localStorage.getItem('user');

    this.dbService.getAll('users').subscribe((users: any[]) => {
      this.profileList = Object.entries(users[0]);
      console.log(users);

    });
    // this.profileList = data["default"][this.typeRole]
    // this.profileList = Object.entries(this.profileList);
  }
  close() {

  }
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

}
