//a simple service
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private BASE_URL = 'http://127.0.0.1:5000';  // URL to web api

  private GERRIT_SERVER = 'http://52.53.239.241:8080/Nutanix'; // URL gerrit server
  private GERRIT_USER = 'test1';
  private GERRIT_PASS = 'test1';

  private GERRIT_SERVER_LOCAL = 'http://gerrit-server:8080/Nutanix.git'; // URL gerrit server
  private GERRIT_USER_LOCAL = 'john';
  private GERRIT_PASS_LOCAL = 'johnldap';


  /*this line is necessary to make the constructor work*/
  static get parameters() {
    return [[Http]];
  }
  /**/
  constructor(private http: Http) { }

  getChartData(filterModel) {
    let url = this.BASE_URL + "/chartsData";
    console.log('getChartData', url);
    let filterData = JSON.parse(filterModel);
    let req = {
      releaseVersion: filterData['releaseVersionModel'],
      repositories: JSON.stringify(filterData['reposModel']),
      branches: JSON.stringify(filterData['branchesModel']),
      users: JSON.stringify(filterData['usersModel']),
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }

    return this.http.post(url, req)
      .map(res => res.json());
  }
  getAllRepositoties() {
    let url = this.BASE_URL + "/getRepositories";
    let req = {}
    return this.http.post(url, req)
      .map(res => res.json());
  }
  getBranchesByRepo(repoData) {
    let url = this.BASE_URL + "/branchesByRepos";
    let req = {
      repositories: repoData
    }
    return this.http.post(url, req)
      .map(res => res.json());
  }
  getUsesByRepo(repoData) {
    let url = this.BASE_URL + "/usersByRepos";
    let req = {
      repositories: repoData
    }
    return this.http.post(url, req)
      .map(res => res.json());
  }

  getHeatMapByFolderOrRepo(filterModel) {
    let url = this.BASE_URL + "/getHeatMapByFolderOrRepo";    
    return this.http.post(url, filterModel)
      .map(res => res.json());
  }

  getListRelease() {
    let url = this.BASE_URL + "/releases";    
    return this.http.post(url, {})
      .map(res => res.json());
  }
}