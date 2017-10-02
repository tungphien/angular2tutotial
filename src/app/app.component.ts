import { Component } from '@angular/core';
import { TranserData } from './services/transerData.service';
import { DataService } from './services/dataServices';
import last from 'lodash/sortedIndex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  chartData: any;
  constructor(private _transferData: TranserData, private _dataService: DataService) { 
    console.log(last([1, 2, 3]));   
  }
}
