import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
@Injectable()
export class TranserData {
    public fileChangeCommitDataSubject = new Subject<any>();
    public jiraStatusDataSubject = new Subject<any>();
    public lineChangeOfCommitDataSubject = new Subject<any>();
    public jiraTypeOfCommitDataSubject = new Subject<any>();

    constructor() { }
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
}