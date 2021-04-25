import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxIndexedDBService } from 'ngx-indexed-db';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userForm: any;
  dataSource: any = [];
  // rolesLsit:any=[]
  datasend: any;
  show: boolean = true;
  getRole: any;
  roles: any = [];
  breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'mobileNumber', 'email', 'password', 'gender', 'Edit'];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private dbService: NgxIndexedDBService
  ) { }

  ngOnInit(): void {
    console.log(new Date())
    this.getRole = localStorage.getItem('token');

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      mobileNumber: ['', [Validators.required]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      id: '',
    });

    this.getRoles();
    this.getUsers();

  }
  getRoles() {
    this.dbService.getAll('roles').subscribe((roles: any[]) => {
      this.roles = roles;
      console.log(roles);
    });
  }
  getUsers() {
    this.dbService.getAll('users').subscribe((users: any[]) => {
      this.dataSource = users;
      console.log(users);

    });
  }
  openDialog(role: any): void {
    this.userForm.reset();
    const dialogRef = this.dialog.open(role, {
      width: '40%',
      disableClose: true,
    });
  }

  addUser() {
    if (this.userForm.invalid) {
      return;
    }
    if (this.userForm.valid) {
      const temp = this.userForm.value;
      let obs: any;
      if (!temp.id) {
        delete temp.id;
        obs = this.dbService
          .add('users', temp);
      } else {
        obs = this.dbService
          .update('users', temp);
      }
      obs.subscribe((key: any) => {
        this.toastr.success(`${temp.id ? 'User Updated' : 'New User Created'} Successfully`);
        this.dialog.closeAll();
        this.getUsers();
      });
    }
    // if (this.userForm.valid) {
    //   this.dbService
    //     .add('roles', {
    //       name: this.userForm.value.name,
    //     })
    //     .subscribe((key) => {
    //       this.toastr.success('New User Created Successfully');
    //       this.dialog.closeAll();
    //     });
    // }
  }

  deleteStudent(element: any) {
    if (window.confirm('Are sure to delete ?')) {
      this.dbService.delete('users', element.id).subscribe((res) => {
        this.getUsers();
        this.toastr.success("Successfully Deleted");
      });
    }
  }

  close() {
    this.dialog.closeAll()
  }

  editStudent(element: any, index: any, student: any) {
    const dialogRef = this.dialog.open(student, {
      width: '40%',
      disableClose: true,
    });
    Object.keys(element).forEach(key => {
      if (this.userForm.get(key)) {
        this.userForm.get(key).setValue(element[key]);
      }
    });
  }
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }
}
