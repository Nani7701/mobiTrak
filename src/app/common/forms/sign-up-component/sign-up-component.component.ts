import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.scss']
})
export class SignUpComponentComponent implements OnInit {


  registationForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private authservice:AuthService,private toster:ToastrService,private navigateRoute:Router) { }

  ngOnInit() {

    let notallowSpecialChar = /^[a-zA-Z0-9_]*$/;
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   

    this.registationForm = this.fb.group({
      firstName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(notallowSpecialChar)
      ])],
      middleName: [null, Validators.compose([
        Validators.pattern(notallowSpecialChar)
      ])],
      lastName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(notallowSpecialChar)
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(emailregex)
      ])],
      mobile: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.registationForm.controls; }


  signUpSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registationForm.invalid) {
      return;
    }

    let data=this.registationForm.value

  this.authservice.signup(data).subscribe(res=>{
    if(res['status']==200){
      this.toster.success(res['message']);
    }
    this.navigateRoute.navigate(['/signIn'])
 

  },
  err=>{
  //  console.log(err)
 
 this.toster.error(err.message);
  })


  }

  numberOnly(event):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
