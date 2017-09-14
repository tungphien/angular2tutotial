import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { StackedChartCommit } from './charts/stacked-chart-commit';
import { StackedChartBug } from './charts/stacked-chart-bug';
import {HeatMapChart} from './charts/heat-map-chart';
import { DataService } from './services/dataServices';

declare var require: any;
export function highchartsFactory() {
  // const highcharts=require('highcharts');
  // const highchartsMore=require('highcharts/highcharts-more');
  // highchartsMore(highcharts);
  return require('highcharts');
}
@NgModule({
  declarations: [
    AppComponent,
    StackedChartCommit,
    StackedChartBug,
    HeatMapChart
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  },DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
