import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;
  constructor(private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      user: ['', Validators.required]
    })
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  submit() {
    localStorage.clear();
    setTimeout(() => {
      localStorage.setItem("token", this.form.value.user);
      // if (this.form.value.user == 'teacher') {
      //   this.route.navigate(['/picmysloar/teachers']);
      // } else if (this.form.value.user == 'student') {
      //   this.route.navigate(['/picmysloar/students']);
      // } else {
      //   this.route.navigate(['/picmysloar']);
      // }
    }, 100);
  }
}
