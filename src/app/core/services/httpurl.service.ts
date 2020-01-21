import { Injectable } from '@angular/core';

import { environment} from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class HttpUrlService {

  

  loginurl = environment.serviceUrl+'login';
  registration=environment.serviceUrl+'vtrack/customer/reg'; // for registering the user
  userInfo=environment.serviceUrl+'vtrack/customer/getByUserName'; // for registering the user
  forgotPassword=environment.serviceUrl+'vtrack/customer/forgotPassword'; // for registering the user
  addMobileNumber = environment.serviceUrl+'vtrack/mobiles/add'; // for add mobile number
  getMakeList = environment.serviceUrl+'vtrack/mobiles/getMakeList/1'; // to get all make lists
  updateStatus = environment.serviceUrl+`${'vtrack/mobiles/updateStatus'}`; // to update mobile status
  getRegisteredMobiles = environment.serviceUrl+`${'vtrack/mobiles/getByRegisterId'}`; // to get all registered mobile details
  updateDetails = environment.serviceUrl+`${'vtrack/mobiles/update'}`; // to update user and mobile details
  searchdata = environment.serviceUrl+`${'vtrack/customer/search'}`; // to get all registered mobile details
  

}
