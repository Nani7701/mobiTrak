import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UpdateDetailsComponent } from '../update-details/update-details.component';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})
export class DashboardComponentComponent implements OnInit {

  headerColumns = ['IMEI1', 'IMEI2', 'Nick Name', 'Mobile Model', 'Mobile Type', 'Status'];
  userData: any;
  registerId: number;
  userDetails: any;
  dialogRef: MatDialogRef<UpdateDetailsComponent>;
  mobileDetails: any;

  constructor(private homeService: HomeService, public dialog: MatDialog) { 
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.registerId = this.userData.userId;
  }

  ngOnInit() {
    this.getAllRegMobDetails();
  }

  getAllRegMobDetails() {
    const data = {
      "register_id" : this.registerId
    }
    this.homeService.getAllRegisteredMobiles(data).subscribe(res => {
      this.userDetails = res['data'];
    });
  }

  updateUser(user) {
    this.mobileDetails = JSON.stringify(user);
    console.log(this.mobileDetails);
    this.dialogRef = this.dialog.open(UpdateDetailsComponent, {
      width: '40%',
      data: this.mobileDetails
    });
  }

}
