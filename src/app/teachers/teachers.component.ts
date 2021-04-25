import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import *  as  data from '../teachers.json';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachersForm: any;
  dataSource: any = data[<any>'default'];
  datasend: any;
  show: boolean = true;

  displayedColumns: string[] = ['firstName', 'lastName', 'subject', 'employeeNo', 'age', 'language', 'gender', 'Edit'];
  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.teachersForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      employeeNo: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      subject: ['', Validators.required],
      // joinedDate:['',Validators.required]
    })
  }
  openDialog(role: any): void {
    this.teachersForm.reset();
    const dialogRef = this.dialog.open(role, {
      width: '40%',
      disableClose: true,

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSource.push(this.datasend);
      console.log(this.dataSource, 'The dialog was closed');
      this.show = true;
      this.dialog.closeAll();
    });
  }
  addTeacher() {
    this.datasend = this.teachersForm.value;
    this.show = false;
  }
  deleteTeacher(teacher: any) {
    this.dataSource.splice(this.dataSource.indexOf(teacher), 1);   //delete the item using splice 
    this.show = false;
    setTimeout(() => {
      this.show = true;
    }, 100);
  }

  close() {
    this.dialog.closeAll()
  }
  editTeacher(element: any, index: any, student: any) {
    const dialogRef = this.dialog.open(student, {
      width: '40%',
      disableClose: true,

    });
    Object.keys(this.dataSource[index]).forEach(element => {
      if (this.teachersForm.get(element)) {
        this.teachersForm.get(element).setValue(this.dataSource[index][element]);
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.dataSource[index] = this.teachersForm.value;
      this.show = true;
      this.dialog.closeAll();
    });
  }

}
