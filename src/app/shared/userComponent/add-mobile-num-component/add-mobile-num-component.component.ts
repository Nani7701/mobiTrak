import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-mobile-num-component',
  templateUrl: './add-mobile-num-component.component.html',
  styleUrls: ['./add-mobile-num-component.component.scss']
})
export class AddMobileNumComponentComponent implements OnInit {

  addMobileGroup: FormGroup;
  submitted = false;
  mobileModalsList: Object;
  userData: any;
  registerId: number;
  @ViewChild(FormGroupDirective,{static:true}) formGroupDirective: FormGroupDirective;
  
  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toster:ToastrService) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;
  }

  ngOnInit() {

    let allowOnlyNum = /^[0-9]*$/;

    this.addMobileGroup = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      mobileNumber: ['', Validators.compose([Validators.required,
        Validators.pattern(allowOnlyNum), Validators.max(10)])],
      imei1: ['', [Validators.required]],
      imei2: [''],
      mobileType: ['', [Validators.required]],
      mobileMakeId: ['', [Validators.required]]
    });
    this.getMakeList();
  }
    
  get f() {
    return this.addMobileGroup.controls;
  }

  getMakeList() {
    this.homeService.getMakeList().subscribe(res => {
      this.mobileModalsList = res['data'];
     // sessionStorage.setItem("MobileList", JSON.stringify(this.mobileModalsList));
    });
  }

  addMobileSubmit() {
    this.submitted = true;
    if (this.addMobileGroup.invalid) {
        return;
    }
    const data = this.addMobileGroup.value;
    data['register_id'] = this.registerId;
    this.homeService.addMobileNumber(data).subscribe(res => {
      this.submitted = false;
      setTimeout(() => 
      this.formGroupDirective.resetForm(), 0)
      if(res['status'] == 200) {
        this.toster.success(res['message']);
      }
    }, err => {   
      this.toster.error(err.message);
    });
  }

  resetForm(value: any = undefined) {
    this.addMobileGroup.reset(value);
    (this as{submitted: boolean}).submitted = false;
  }

  numberOnly1(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
