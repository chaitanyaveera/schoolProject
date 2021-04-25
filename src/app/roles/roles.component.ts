import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as data from '../roles.json'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataSource: any = data[<any>'default'];
  datasend: any;
  roleName: any = ''
  displayedColumns: string[] = ['role', 'edit'];
  show: boolean = true;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(role: any): void {
    const dialogRef = this.dialog.open(role, {
      width: '30%',
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.roleName) {
        this.dataSource.push(this.datasend);           //sending data for Roles
      }
      this.show = true;
    });
  }
  close() {
    this.dialog.closeAll();                   //close the role dialogue
  }
  addRole() {
    let id = Math.random() * 100;
    let obj = {
      roleName: this.roleName,
      id: Math.round(id)
    }
    this.show = false;
    this.datasend = obj;
  }
  editRole(element: any, index: any, role: any) {
    const dialogRef = this.dialog.open(role, {
      width: '30%',
      disableClose: true,
    });
    this.roleName = element.roleName;
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource[index].roleName = this.roleName;        //edit role name assign
      this.show = true;
      this.roleName = '';
    });
  }
  deleteRole(element: any) {
    this.dataSource.splice(this.dataSource.indexOf(element), 1);   //delete the item using splice 
    this.show = false;
    setTimeout(() => {
      this.show = true;
    }, 100);
  }
}

// export interface roles {
//   roleName: string;
// }

