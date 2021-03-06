import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUrlService } from './httpurl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authdata:any=JSON.parse(sessionStorage.getItem('authdetails'));
  headers:any;
  options:any;
  
  constructor(private dataclient:HttpclientService,private http:HttpClient,private url:HttpUrlService) { 
   
    // this.authdata=JSON.parse(sessionStorage.getItem('authdetails'));
    // console.log(this.authdata)
  }

  



  signup(data){

   return this.http.post(this.url.registration,JSON.stringify(data));

  }

  signIn(data){
    return this.http.post(this.url.loginurl,JSON.stringify(data));
  }

  getUserInfo(data){
    this.authdata=JSON.parse(sessionStorage.getItem('authdetails'));
  this.headers = new HttpHeaders({
    'authorization':  this.authdata['authorization'],
 
  });

 this.options = {
    headers: this.headers
  }
    return this.http.post(this.url.userInfo,JSON.stringify(data),this.options);
  }

  sendforgotPasswordLink(data){
    return this.http.post(this.url.forgotPassword,JSON.stringify(data));
  }



}
