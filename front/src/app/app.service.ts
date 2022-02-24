import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppService {

  constructor (private httpClient: HttpClient) {
  }

  getJobs () {
    return this.httpClient.get('http://localhost:3000/api/jobs').toPromise()
  }

  getCrons () {
    return this.httpClient.get('http://localhost:3000/api/crons').toPromise()
  }
}
