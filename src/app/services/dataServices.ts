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
  getCurrentTime(filterData) {
    console.log('getCurrentTime', filterData);
    return this.http.get("http://date.jsontest.com/").map(res => res.json());
  }

  getFilesChangeOfCommits(data) {   
    let url = this.BASE_URL + '/filesChangeOfCommits';
    let filterData = JSON.parse(data);
    var req = {
      url: "http://10.20.15.80:8080/a/Nutanix",
      username: "john",
      password: "johnldap",
      branch: filterData['branchesModel'],
      user: filterData['usersModel'],
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }
    
    return this.http.post(url, req)
      .map(res => res.json());
  }
  
  getJiraStatusOfCommits(data) {   
    let url = this.BASE_URL + '/jiraStatusOfCommits';
    let filterData = JSON.parse(data);
    var req = {
      url: "http://10.20.15.80:8080/a/Nutanix",
      username: "john",
      password: "johnldap",
      branch: filterData['branchesModel'],
      user: filterData['usersModel'],
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }
    
    return this.http.post(url, req)
      .map(res => res.json());
  }

  getLineChangeOfCommits(data) {   
    let url = this.BASE_URL + '/linesChangeOfCommits';
    let filterData = JSON.parse(data);
    var req = {
      url: "http://10.20.15.80:8080/a/Nutanix",
      username: "john",
      password: "johnldap",
      branch: filterData['branchesModel'],
      user: filterData['usersModel'],
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }
    
    return this.http.post(url, req)
      .map(res => res.json());
  }

  getJiraTypeOfCommits(data) {   
    let url = this.BASE_URL + '/jiraTypeOfCommits';
    let filterData = JSON.parse(data);
    var req = {
      url: "http://10.20.15.80:8080/a/Nutanix",
      username: "john",
      password: "johnldap",
      branch: filterData['branchesModel'],
      user: filterData['usersModel'],
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }
    
    return this.http.post(url, req)
      .map(res => res.json());
  }
}