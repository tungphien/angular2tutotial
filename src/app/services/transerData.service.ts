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
    public loadingGraph1DataSubject = new Subject<any>();
    updateLoadingGraph1(booleanValue) {
      this.loadingGraph1DataSubject.next(booleanValue);
    }
    public loadingGraph2DataSubject = new Subject<any>();
    updateLoadingGraph2(booleanValue) {
      this.loadingGraph2DataSubject.next(booleanValue);
    }
    public loadingGraph3DataSubject = new Subject<any>();
    updateLoadingGraph3(booleanValue) {
      this.loadingGraph3DataSubject.next(booleanValue);
    }
    public loadingGraph4DataSubject = new Subject<any>();
    updateLoadingGraph4(booleanValue) {
      this.loadingGraph4DataSubject.next(booleanValue);
    }
    public loadingGraph5DataSubject = new Subject<any>();
    updateLoadingGraph5(booleanValue) {
      this.loadingGraph5DataSubject.next(booleanValue);
    }
    public loadingGraph6DataSubject = new Subject<any>();
    updateLoadingGraph6(booleanValue) {
      this.loadingGraph6DataSubject.next(booleanValue);
    }
}