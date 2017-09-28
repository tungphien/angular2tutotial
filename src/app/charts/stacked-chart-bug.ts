import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataServices';
import { TranserData } from '../services/transerData.service';

@Component({
    selector: 'stacked-chart-bug',
    template: `
        <div class="chart-container">
            <img *ngIf="isLoading" class="loading" src="./assets/images/loading.gif"/>
            <chart id="stacked-chart-bug" [options]="options"></chart>
       </div>
   `
})
export class StackedChartBug implements OnInit {
    private isLoading = false;
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
                text: 'Bug Status vs TimeLine'
            },

            xAxis: {
                categories: categories
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of bugs'
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
        this._transferData.loadingGraph2DataSubject.subscribe(res => { this.isLoading = true });
        this._transferData.jiraStatusDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res);
            this.isLoading = false;
        });
    }
    constructor(private _transferData: TranserData, private _dataService: DataService) { }
    options: Object;
}