import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
@Injectable()
export class TranserData {
    public fileChangeCommitDataSubject = new Subject<any>();
    public jiraStatusDataSubject = new Subject<any>();
    public lineChangeOfCommitDataSubject = new Subject<any>();
    public jiraTypeOfCommitDataSubject = new Subject<any>();
    public heatmapOfCommitDataSubject = new Subject<any>();
    public jiraDefectOfCommitDataSubject = new Subject<any>();    

    constructor() { }
    // update data for chart
    updateChartFileChangeCommitData(data) {
        this.fileChangeCommitDataSubject.next(data);
    }
    updateChartJiraStatusCommitData(data) {
        this.jiraStatusDataSubject.next(data);
    }
    updateLineChangeOfCommitData(data) {
        this.lineChangeOfCommitDataSubject.next(data);
    }
    updateJiraTypeOfCommitData(data) {
        this.jiraTypeOfCommitDataSubject.next(data);
    }
    updateHeatMapOfCommitData(data) {
        this.heatmapOfCommitDataSubject.next(data);
    }
    updateJiraDefectOfCommitData(data) {
        this.jiraDefectOfCommitDataSubject.next(data);
    }

    // update loading
    public loadingDataSubject = new Subject<any>();
    updateLoadingGraph(booleanValue) {
      this.loadingDataSubject.next(booleanValue);
    }    
}