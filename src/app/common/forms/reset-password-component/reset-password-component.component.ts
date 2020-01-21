import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-component',
  templateUrl: './reset-password-component.component.html',
  styleUrls: ['./reset-password-component.component.scss']
})
export class ResetPasswordComponentComponent implements OnInit {

  resetPasswordGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.resetPasswordGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  });
  }
    
  get f() { return this.resetPasswordGroup.controls; }
  resetPasswordSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordGroup.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.resetPasswordGroup.value, null, 4));
}

}
