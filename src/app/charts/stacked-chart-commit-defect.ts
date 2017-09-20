import { Component, OnInit } from '@angular/core';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'stacked-chart-commit-defect',
    template: `
    <div class="chart-container">
    <img *ngIf="isLoading" class="loading" src="../assets/images/loading.gif"/>
       <chart [options]="options"></chart>
       </div>
   `
})
export class StackedChartCommitDefect implements OnInit {
    private isLoading=true;
    drawChart(data) {
        let categories = [];
        let series = [];
        this.options = this.bindChartOption(categories, series);
    }
    bindChartOption(categories, series) {
        return {
            credits: {
                enabled: false
            },
            colors: ['#ed7d31', '#4472c4'],
            chart: {
                type: 'column'
            },
            title: {
                text: 'Commits VS Time Line (Jira Defect)'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: series
        };
    }

    ngOnInit(): void {
        this.drawChart("");
        let categories = [];
        let series = [];
        this._transferData.loadingGraph6DataSubject.subscribe(res => { this.isLoading = true });
        this._transferData.jiraDefectOfCommitDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res.dates, res.datas);
            this.isLoading=false;
        });
    }

    constructor(private _transferData: TranserData, private _dataService:DataService ) {  }
    options: Object;
}