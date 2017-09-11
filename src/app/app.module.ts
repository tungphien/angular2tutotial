import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { StackedChartCommit } from './charts/stacked-chart-commit';
import { StackedChartBug } from './charts/stacked-chart-bug';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}
@NgModule({
  declarations: [
    AppComponent,
    StackedChartCommit,
    StackedChartBug
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
