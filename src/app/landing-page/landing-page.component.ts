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
  public islaunchTrue: string;
  public islandedTrue: string;
  public spacexData:any;
  public fetchedData:any;
  constructor(private httpservice: HttService, private router: Router) { }

  ngOnInit() {
    this.launchYears=["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
    this.islaunchTrue="";
    this.islandedTrue="";
    this.getspaceXInfo();
  }
  getspaceXInfo():void{
    this.showSpinner = true;
  this.httpservice.getResponse().subscribe((data) => {
    this.fetchedData = data;
      this.spacexData= this.fetchedData;
      console.log(this.spacexData);
      this.showSpinner = false;
  });
}
navigate(selected:string|boolean){
    this.router.navigate(['/all'],{queryParams: { value: this.islaunchSuccessful+"/"+this.islandedSuccessful+"/"+this.selectedYear }})
    this.spacexData = this.fetchedData.filter((data)=>{
      return data.launch_year== this.selectedYear && data.launch_success == this.islaunchSuccessful && data.rocket.first_stage.cores[0].land_success == this.islandedSuccessful;
    }); 
}

// debouncing
 waitForSomeTime<Params extends any[]>(fn :(...args:Params) => any, delay:number){
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

 ngOnDestroy(): void {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}
}
