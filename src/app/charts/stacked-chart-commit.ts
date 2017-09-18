import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'stacked-chart-commit',
    template: `
       <chart [options]="options"></chart> 
   `
})
export class StackedChartCommit implements OnInit {  
   
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
                text: 'Commits VS Time Line'
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
        this._transferData.fileChangeCommitDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res.dates, res.datas)
        });
    }

    constructor(private _transferData: TranserData, private _dataService:DataService ) { 
        let defaultFilter = {};
        defaultFilter['startDate'] = '';
        defaultFilter['endDate'] = '';
        defaultFilter['reposModel'] = '';
        defaultFilter['branchesModel'] = '';
        defaultFilter['usersModel'] ='';
        this._dataService.getFilesChangeOfCommits(JSON.stringify(defaultFilter)).subscribe(res => {
            this._transferData.updateChartFileChangeCommitData(res);
        },
            error => alert("error"),
            () => {
                console.log("Finish");
            }
        );
    }
    options: Object;
}