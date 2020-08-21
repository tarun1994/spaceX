import { Component, OnInit } from '@angular/core';
import { HttService } from '../htt.service';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private showSpinner:boolean;
  public launchYears: Array<string>;
  public selectedYear: string;
  public islaunchSuccessful: boolean;
  public islandedSuccessful: boolean;
  public spacexData:any
  constructor(private httpservice: HttService, private router: Router) { }

  ngOnInit() {
    this.launchYears=["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
    this.showSpinner=false;
    this.getspaceXInfo();
  }
  getspaceXInfo():void{
    this.showSpinner = true;
  this.httpservice.getResponse().subscribe((data) => {
      this.spacexData= data;
      console.log(this.spacexData);
      this.showSpinner = false;
  });
}
reset(){
  this.islandedSuccessful=false;
  this.islaunchSuccessful=false;
  this.selectedYear="";
}
navigate(selected:string|boolean){
  if(this.selectedYear && this.islaunchSuccessful && this.islandedSuccessful){
    this.router.navigate(['/all'],{queryParams: { value: this.islaunchSuccessful+"/"+this.islandedSuccessful+"/"+this.selectedYear }})
    this.httpservice.getAllResponse(this.islaunchSuccessful,this.islandedSuccessful,this.selectedYear).subscribe((data) => {
      this.spacexData= data;
      this.showSpinner = false;
  });
  this.reset();
  }else if(this.islaunchSuccessful){
    this.router.navigate(['/launch'],{queryParams: { value: this.islaunchSuccessful }})
    this.httpservice.getLaunchSuccessResponse(this.islaunchSuccessful).subscribe((data) => {
      this.spacexData= data;
      this.showSpinner = false;
  });
  this.reset();
  }
  else if(this.islaunchSuccessful && this.islandedSuccessful){
    this.router.navigate(['/launch&land'],{queryParams: { value: this.islaunchSuccessful+"/"+this.islandedSuccessful }})
    this.httpservice.getLaunchLandSuccessResponse(this.islaunchSuccessful,this.islandedSuccessful).subscribe((data) => {
      this.spacexData= data;
      this.showSpinner = false;
  });
  this.reset();
  }

  // this.router.navigate(['/userinfo'],{queryParams: { value: selectedId }})
}

// debouncing
 waitForSomeTime<Params extends any[]>(fn :(...args:Params) => any, delay:number){
  console.log("arg" );
  let timer;
  return function(this,...args){
    let context = this;
    console.log("arg",args);
    clearTimeout(timer);
    timer= setTimeout(()=>{
      this.navigate.apply(context, args)
    },delay)
  }
}
 debounced = this.waitForSomeTime(this.navigate,300);


}
