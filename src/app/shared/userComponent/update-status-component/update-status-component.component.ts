import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { ToastrService } from 'ngx-toastr';
import {DatePipe} from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-update-status-component',
  templateUrl: './update-status-component.component.html',
  styleUrls: ['./update-status-component.component.scss']
})
export class UpdateStatusComponentComponent implements OnInit {

  addMobileGroup: FormGroup;
  submitted = false;
  mobileModalsList: Object;
  userMobiles: any;

  // MobileStatus = [
  //   { id: 1, reason: "Lost" },
  //   { id: 2, reason: "Found" },
  //   { id: 3, reason: "Sold" }
  // ];

  mobileStatus = [{
    id:1,
    name:'Lost'
  },{
    id:2,
    name:'Found',
  },{
    id:3,
    name:'Sold',
  }]
  selectedId: any;
//   date: Date = new Date();
settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
} 

  userData: any;
  registerId: any;
  userDetails: any;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService,private toster: ToastrService,private datepipe:DatePipe) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;
  }

  ngOnInit() {
    this.addMobileGroup = this.formBuilder.group({
      status: ['', [Validators.required]],
      dateAndTime: ['', [Validators.required]],
      mobileMakeId: ['', [Validators.required]],
      buyerName: [''],
      buyerEmail: ['' ],
      buyerMobile: [''],
      uploadFile: ['']
    });

    const toSelect = this.mobileStatus.find(c => c.id == 1);
      console.log(this.addMobileGroup.get('status').setValue(toSelect));

    this.getMakeList();
    this.getAllRegMobDetails();

    this.addMobileGroup.get('status').valueChanges.subscribe(  
      value=> { 
        if(value.name=='Sold'){

          this.addMobileGroup.controls["buyerName"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerEmail"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerMobile"].setValidators(Validators.required);
          this.addMobileGroup.controls["buyerName"].updateValueAndValidity();
          this.addMobileGroup.get('buyerEmail').updateValueAndValidity();
          this.addMobileGroup.get('buyerMobile').updateValueAndValidity();
          this.addMobileGroup.controls["dateAndTime"].clearValidators();
          this.addMobileGroup.get('dateAndTime').updateValueAndValidity();
        } 
        else{
          this.addMobileGroup.controls["buyerName"].clearValidators();
          this.addMobileGroup.controls["buyerEmail"].clearValidators();
          this.addMobileGroup.controls["buyerMobile"].clearValidators();
          this.addMobileGroup.controls["buyerName"].updateValueAndValidity();
          this.addMobileGroup.get('buyerEmail').updateValueAndValidity();
          this.addMobileGroup.get('buyerMobile').updateValueAndValidity();
        }
      
      }  
   );
  }

  getAllRegMobDetails() {

    const data = {
      "register_id" : this.registerId
    }
    this.homeService.getAllRegisteredMobiles(data).subscribe(res => {
      this.userDetails = res['data'];
      this.userDetails = this.userDetails.filter(c => c.status="ACTIVE");
      console.log(this.userDetails);
    });

  }

  

  getMakeList() {
    this.homeService.getMakeList().subscribe(res => {
      this.mobileModalsList = res['data'];
    });
  }
    
  get f() { 
    return this.addMobileGroup.controls; 
  }

  addMobileSubmit() {

    this.submitted = true;
    if (this.addMobileGroup.invalid) {
        return;
    }
    else {
      let data:any={};
      // let dateo=this.datepipe.transform(this.addMobileGroup.value.dateAndTime,"yyyy-MM-dd HH:MM");
      // console.log(dateo)
     data['userInfo']={
      'userId':this.userData.userId
     }
     data['mobileInfo']={
      "id" :this.addMobileGroup.value.mobileMakeId.id,
      "nickName": this.addMobileGroup.value.mobileMakeId.nickName,
      "status":this.addMobileGroup.value.status.name
     }

     if(this.addMobileGroup.value.status.name=='Found'){
      data['foundInfo']={
        "foundDate" : this.addMobileGroup.value.dateAndTime
      }

     }
     if(this.addMobileGroup.value.status.name=='Lost'){
      data['lostInfo']={
        "lostDate" : this.addMobileGroup.value.dateAndTime
      }
    
    

     }
     if(this.addMobileGroup.value.status.name=='Sold'){
      data['soldInfo']={
        "buyerName" : this.addMobileGroup.value.buyerName,
        "buyerEmail" :this.addMobileGroup.value.buyerEmail,
        "buyerMobile" : this.addMobileGroup.value.buyerMobile
    
      }
     }
     


this.homeService.updateMobileStatus(data).subscribe(res=>{
this.toster.success(res['message']);
})

    }
}

}
