import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map'
@Injectable()
export class TranserData{
    public filterDataSubject=new Subject<any>();
    constructor(){}
    updateFilterData(data){
        this.filterDataSubject.next(data);
    }
}