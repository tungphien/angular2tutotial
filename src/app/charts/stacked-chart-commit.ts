import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'stacked-chart-commit',
    template: `
    <div class="chart-container">
        <img *ngIf="isLoading" class="loading" src="./assets/images/loading.gif"/>
       <chart [options]="options"></chart> 
       </div>
   `
})
export class StackedChartCommit implements OnInit {
    isLoading = false;
    bindChartOption(res) {
        let categories = [];
        let series = [];
        if (res != null) {
            categories = res['dates']
            if (res['datas']) {
                Object.keys(res['datas']).forEach(item => {

                    res['datas'][item].forEach(pro => {
                        let serie = {};
                        serie['name'] = pro['name'];
                        serie['data'] = pro['data'];
                        serie['stack'] = item;
                        series.push(serie);
                    });

                });
            }

        }
        return {
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },

            title: {
                text: 'Number of Commit vs TimeLine'
            },

            xAxis: {
                categories: categories
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of commit'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        'Project: ' + this.series.userOptions.stack + '<br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: series
        };
    }

    ngOnInit(): void {
        this.options = this.bindChartOption(null);
        this._transferData.loadingGraph1DataSubject.subscribe(res => { this.isLoading = true });
        this._transferData.fileChangeCommitDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res);
            this.isLoading = false;
        });
    }

    constructor(private _transferData: TranserData, private _dataService: DataService) { }
    options: Object;
}