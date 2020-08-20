import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttService {
  private configUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
  constructor(private http: HttpClient) {
   }
   getResponse(): Observable<any>{
       return this.http.get(this.configUrl);
   }
   getLaunchSuccessResponse(val:boolean): Observable<any>{
        return this.http.get(this.configUrl+"&launch_success="+val);
   }
   getLaunchLandSuccessResponse(launchval:boolean,landval:boolean): Observable<any>{
    return this.http.get(this.configUrl+"&launch_success="+launchval+"&land_success="+landval);
  }
  getAllResponse(launchval:boolean,landval:boolean,year:string): Observable<any>{
    return this.http.get(this.configUrl+"&launch_success="+launchval+"&land_success="+landval+"&launch_year="+year);
  }
}
