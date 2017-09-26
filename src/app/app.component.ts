import { Component } from '@angular/core';
import { TranserData } from './services/transerData.service';
import { DataService } from './services/dataServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartData: any;
  constructor(private _transferData: TranserData, private _dataService: DataService) { 
    let defaultFilter = {};
    defaultFilter['startDate'] = '';
    defaultFilter['endDate'] = '';
    defaultFilter['reposModel'] = '';
    defaultFilter['branchesModel'] = '';
    defaultFilter['usersModel'] = '';
    defaultFilter['releaseVersionModel'] = '1.0';
    this._dataService.getChartData(JSON.stringify(defaultFilter)).subscribe(res => {
      this._transferData.updateChartFileChangeCommitData(res[0]);
      this._transferData.updateChartJiraStatusCommitData(res[1]);
      this._transferData.updateLineChangeOfCommitData(res[2]);
      this._transferData.updateJiraTypeOfCommitData(res[3]);
      // this._transferData.updateHeatMapOfCommitData(res[4]);
      this._transferData.updateJiraDefectOfCommitData(res[5]);
    },
      error => {
        alert("error: Can't get chart data for graph");
        this._transferData.updateChartFileChangeCommitData(null);
      },
      () => {
        console.log("Finish");
      }
    );
  }
}
