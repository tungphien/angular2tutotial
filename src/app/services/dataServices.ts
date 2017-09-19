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

  /*
    typeChart: graph1,graph2,graph3,graph4,graph5,graph6    
  */
  getChartData(filterModel, typeChart) {
    let url = this.BASE_URL + "/chartsData";
    // switch (typeChart) {
    //   case 'graph1':
    //     url = this.BASE_URL + '/filesChangeOfCommits';
    //     break;
    //   case 'graph2':
    //     url = this.BASE_URL + '/jiraStatusOfCommits';
    //     break;
    //   case 'graph3':
    //     url = this.BASE_URL + '/linesChangeOfCommits';
    //     break;
    //   case 'graph4':
    //     url = this.BASE_URL + '/jiraTypeOfCommits';
    //     break;
    //   case 'graph5':
    //     url = this.BASE_URL + '/heatmapFileChanges';
    //     break;
    //   case 'graph6':
    //     url = this.BASE_URL + '/jiraDefectOfCommits';
    //     break;
    //   default:
    //     url = this.BASE_URL + '/filesChangeOfCommits';
    //     break;
    // }    
    console.log('getChartData',url);    
    let filterData = JSON.parse(filterModel);
    var req = {
      // url: this.GERRIT_SERVER,
      // username: this.GERRIT_USER,
      // password: this.GERRIT_PASS,
      url: this.GERRIT_SERVER_LOCAL,
      username: this.GERRIT_USER_LOCAL,
      password: this.GERRIT_PASS_LOCAL,
      branch: filterData['branchesModel'],
      user: filterData['usersModel'],
      startdate: filterData['startDate'],
      enddate: filterData['endDate']
    }

    return this.http.post(url, req)
      .map(res => res.json());
  }
}