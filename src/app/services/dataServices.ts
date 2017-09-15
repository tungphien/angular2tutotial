//a simple service
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private BASE_URL = 'http://127.0.0.1:5000';  // URL to web api
  // private APP_ID = '8abbcd8e';
  // private API_KEY = '36e8d264537037ee7e832a41902ffe57';

  /*this line is necessary to make the constructor work*/
  static get parameters() {
    return [[Http]];
  }
  /**/
  constructor(private http: Http) {

  }
  getCurrentTime(filterData){
    console.log('getCurrentTime',filterData);
     return this.http.get("http://date.jsontest.com/").map(res=> res.json());    
  }

  getCommits(_searchString) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('url', "http://10.20.15.80:8080/a/Nutanix");
    params.set('username', "john");
    params.set('password', "johnldap");
    params.set('branch', "master");

    
    let headerParams = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headerParams.append('Accept', 'application/json');
    headerParams.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headerParams.append('Access-Control-Allow-Origin', '*');
    headerParams.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");

    let url = this.BASE_URL + '/commits' + _searchString;

    // return this.http.post(url, { body: params, headers: headerParams })
    return this.http.get("https://restcountries.eu/rest/v2/region/europe")
      .map(res => res.json());
  }
}