import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpUrlService } from './httpurl.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  authdata=JSON.parse(sessionStorage.getItem('authdetails'));
  headers = new HttpHeaders({
     'authorization':  this.authdata==null ? null :this.authdata['authorization'],
  });
  options = {
    headers: this.headers,
  }

  constructor(private dataclient:HttpclientService,private http:HttpClient,private url:HttpUrlService) {
  }

  addMobileNumber(data) {
    return this.http.post(this.url.addMobileNumber, JSON.stringify(data), this.options);
  }

  getMakeList() {
    return this.http.get(this.url.getMakeList, this.options);
  }

  updateMobileStatus(data) {
    return this.http.post(this.url.updateStatus, JSON.stringify(data), this.options);
  }

  getAllRegisteredMobiles(data) {
    return this.http.post(this.url.getRegisteredMobiles, JSON.stringify(data), this.options);
  }
  searchdataByimei(data){
    return this.http.post(this.url.searchdata, JSON.stringify(data), this.options);
  }

  updateDetails(data) {
    return this.http.post(this.url.updateDetails, JSON.stringify(data), this.options);
  }


}
