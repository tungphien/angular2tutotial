import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { StackedChartCommit } from './charts/stacked-chart-commit';
import { StackedChartBug } from './charts/stacked-chart-bug';
import { StackedChartCommitSize } from './charts/stacked-chart-commit-size';
import { StackedChartCommitNewEnhancement } from './charts/stacked-chart-commit-newfeature-enhancement';
import { HeatMapChart } from './charts/heat-map-chart';
import { Filter } from './components/filter.component';
import { DataService } from './services/dataServices';
import { TranserData } from './services/transerData.service';
import { StackedChartCommitDefect } from './charts/stacked-chart-commit-defect';

declare var require: any;
export function highchartsFactory() {
  var Highcharts = require('highcharts');
  var Heatmap = require('highcharts/modules/heatmap');
  Heatmap(Highcharts);
  return Highcharts;
}
@NgModule({
  declarations: [
    AppComponent,
    StackedChartCommit,
    StackedChartBug,
    StackedChartCommitSize,
    StackedChartCommitNewEnhancement,
    HeatMapChart,
    StackedChartCommitDefect,
    Filter
  ],
  imports: [
    MultiselectDropdownModule,    
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [{ provide: HighchartsStatic, useFactory: highchartsFactory },DataService, TranserData],
  bootstrap: [AppComponent]
})
export class AppModule { }
