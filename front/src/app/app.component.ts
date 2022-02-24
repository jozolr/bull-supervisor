import { Component } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bull-supervisor-front';
  jobs: Promise<any>;
  crons: Promise<any>;


  constructor (private appService: AppService) {
    this.jobs = appService.getJobs();
    this.crons = appService.getCrons();
  }
}
