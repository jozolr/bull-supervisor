import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bull-supervisor-front';
  jobs: Promise<any>;


  constructor (private appService: AppService, public oidcSecurityService: OidcSecurityService) {
    this.jobs = appService.getJobs();
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      /*...*/
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
