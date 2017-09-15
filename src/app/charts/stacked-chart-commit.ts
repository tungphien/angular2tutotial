import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranserData } from '../services/transerData.service';

@Component({
    selector: 'stacked-chart-commit',
    template: `
       <chart [options]="options"></chart>    
       <div>{{a}}</div>
   `
})
export class StackedChartCommit implements OnInit {
    a: any = "hello";
    recievedData(data) {
        console.log('StackedChartCommit', data);
        //this.drawChart("");
    }
    drawChart(data) {
        let categories = ['9/1/2017', '9/2/2017', '9/3/2017', '9/4/2017', '9/5/2017', '9/6/2017', '9/7/2017'];
        let series = [{
            name: 'New files',
            data: [120, 140, 108, 200, 184, 152, 80]
        }, {
            name: 'Modified files',
            data: [180, 210, 162, 300, 276, 228, 120]
        }];
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
        let categories = ['9/1/2017', '9/2/2017', '9/3/2017', '9/4/2017', '9/5/2017', '9/6/2017', '9/7/2017'];
        let series = [{
            name: 'New files',
            data: [12, 10, 10, 20, 84, 12, 80]
        }, {
            name: 'Modified files',
            data: [80, 20, 62, 30, 26, 28, 20]
        }];
        this._transferData.chartCommitDataSubject.subscribe(data => {
            this.options = this.bindChartOption(categories, series),
                this.a = data['time']
        });
    }

    constructor(private _transferData: TranserData) { }
    options: Object;
}