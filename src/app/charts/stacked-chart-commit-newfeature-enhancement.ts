import { Component, OnInit } from '@angular/core';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'stacked-chart-commit-new-enhancement',
    template: `
    <div class="chart-container">
       <loading [isLoading]="isLoading"></loading>
       <chart [options]="options"></chart>
       </div>
   `
})
export class StackedChartCommitNewEnhancement implements OnInit {
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
                text: 'New Feature and Enhancement Commit vs TimeLine'
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
        this._transferData.loadingDataSubject.subscribe(res => { this.isLoading = res; });
        this._transferData.jiraTypeOfCommitDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res);
            this._transferData.updateLoadingGraph(false);
        });
    }

    constructor(private _transferData: TranserData, private _dataService: DataService) { }
    options: Object;
}