import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formRegister: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }
  register() {

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formRegister.controls[controlName].hasError(errorName);
  }
}
