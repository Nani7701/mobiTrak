import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-component',
  templateUrl: './forgot-password-component.component.html',
  styleUrls: ['./forgot-password-component.component.scss']
})
export class ForgotPasswordComponentComponent implements OnInit {

  forgotPasswordGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private api: AuthService, private toster: ToastrService,private navigateRoute:Router) { }

  ngOnInit() {

    this.forgotPasswordGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      // oTP: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
    
  get f() { return this.forgotPasswordGroup.controls; }
  forgotPasswordSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordGroup.invalid) {
        return;
    }
    else{
      let data={}

      if(isNaN(this.forgotPasswordGroup.value.email)){
        data['email']=this.forgotPasswordGroup.value.email
      }
      else{
        data['mobile']=this.forgotPasswordGroup.value.email 
      }

this.api.sendforgotPasswordLink(data).subscribe(res=>{
if(res['status']==200){
  this.toster.success(res['message'])
this.navigateRoute.navigate(['']);
}
},
err=>{
  this.toster.error(err.message)
})

    }

}

}
