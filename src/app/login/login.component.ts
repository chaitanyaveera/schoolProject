import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private dbService: NgxIndexedDBService,
    private toastr: ToastrService,
    ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      // user: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  async submit() {
    localStorage.clear();
    if(this.form.valid){
      const {email,password} = this.form.value;
      if(email == 'admin@gmail.com' && password == 'admin'){
        window.localStorage.setItem('user',JSON.stringify({
          email,
          password,
          role:'admin'
        }))
        // navigate to roles page
        this.route.navigate(['home','roles']);
        return;
      }
      const users:any[] = await this.dbService.getAll('users').toPromise();
      if(users?.length){
        console.log(users  ,'users')
        const user = users.find((each)=> each.email == email && each.password == password);
        if(user){
          window.localStorage.setItem('user',JSON.stringify(user));
          this.route.navigate(['/profile']);
        }else{
          this.toastr.error('Invalid Credentials');
        }
      }
    }
  }
}
