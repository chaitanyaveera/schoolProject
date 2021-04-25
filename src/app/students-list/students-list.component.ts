import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import *  as  data from '../students.json';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  studentForm: any;
  dataSource: any = data[<any>'default'];
  datasend: any;
  show: boolean = true;
  getRole: any;

  displayedColumns: string[] = ['firstName', 'lastName', 'rollNo', 'age', 'standard', 'gender', 'Edit'];
  constructor(private fb: FormBuilder, private dialog: MatDialog , private toastr:ToastrService) { }

  ngOnInit(): void {
    console.log(new Date())
    this.getRole = localStorage.getItem('token')


    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      rollNo: ['', Validators.required],
      standard: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }
  openDialog(role: any): void {
    this.studentForm.reset();
    const dialogRef = this.dialog.open(role, {
      width: '40%',
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.studentForm.valid) {
        this.dataSource.push(this.datasend);
        this.toastr.success("Successfull");

      }
      this.show = true;
      this.studentForm.reset();
      this.dialog.closeAll();
    });
  }
  addStudent() {
    this.datasend = this.studentForm.value;
    console.log(this.datasend, "this is form");
    this.show = false;
  }
  deleteStudent(std: any) {
    this.dataSource.splice(this.dataSource.indexOf(std), 1);   //delete the item using splice
    this.toastr.success("Deleted"); 
    this.show = false;
    setTimeout(() => {
      this.show = true;
    }, 100);
  }

  close() {
    this.dialog.closeAll()
  }
  editStudent(element: any, index: any, student: any) {
    const dialogRef = this.dialog.open(student, {
      width: '40%',
      disableClose: true,

    });
    Object.keys(this.dataSource[index]).forEach(element => {
      if (this.studentForm.get(element)) {
        this.studentForm.get(element).setValue(this.dataSource[index][element]);
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSource[index] = this.studentForm.value;
      this.toastr.success("Successfull");
      this.show = true;
      this.dialog.closeAll();
    });
  }

}

