import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
@Injectable()
export class TranserData {
    public chartCommitDataSubject = new Subject<any>();
    constructor() { }
    updateChartCommitData(data) {
        this.chartCommitDataSubject.next(data);
    }
}