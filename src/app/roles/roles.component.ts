import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrService } from 'ngx-toastr';
import * as data from '../roles.json'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataSource: any[] = [];
  datasend: any;
  roleName: any = ''
  displayedColumns: string[] = ['role', 'edit'];
  show: boolean = true;
  form: FormGroup;
  constructor(
    public dialog: MatDialog,
    private dbService: NgxIndexedDBService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      id: ''
    })
  }

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles() {
    this.dbService.getAll('roles').subscribe((roles: any[]) => {
      this.dataSource = roles;
      console.log(roles);
    });
  }

  openDialog(role: any): void {
    this.form.reset();
    const dialogRef = this.dialog.open(role, {
      width: '30%',
      disableClose: true,

    });
  }
  close() {
    this.dialog.closeAll();                   //close the role dialogue
  }
  addRole() {
    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {
      const temp = this.form.value;
      let obs: any;
      if (!temp.id) {
        obs = this.dbService
          .add('roles', { name: this.form.value.name });
      } else {
        obs = this.dbService
          .update('roles', { ...this.form.value });
      }
      obs.subscribe((key: any) => {
        this.toastr.success('New Role Created Successfully');
        this.dialog.closeAll();
        this.getRoles();
      });
    }
  }
  editRole(role: any, viewRef: any) {
    this.form.reset();
    const dialogRef = this.dialog.open(viewRef, {
      width: '30%',
      disableClose: true,
    });
    this.form.get('name')?.setValue(role.name);
    this.form.get('id')?.setValue(role.id);
  }
  deleteRole(element: any) {
    if (window.confirm('Are sure to delete ?')) {
      this.dbService.delete('roles', element.id).subscribe((res) => {
        this.getRoles();
        this.toastr.success("Successfully Deleted");
      });
    }
  }
}

// export interface roles {
//   roleName: string;
// }

