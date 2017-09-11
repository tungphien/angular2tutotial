import { Component } from '@angular/core';

@Component({
    selector: 'stacked-chart-bug',
    template: `
       <chart [options]="options"></chart>
   `
})
export class StackedChartBug {
    constructor() {
        this.options = {
            colors: ['red','blue','yellow','green', 'pink'],
            chart: {
                type: 'column'
            },
            title: {
                text: 'Bugs VS Timeline'
            },
            xAxis: {
                categories: ['9/1/2017', '9/2/2017', '9/3/2017', '9/4/2017', '9/5/2017','9/6/2017', '9/7/2017']
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
            series: [{
                name: 'New',
                data: [5, 10, 13, 15, 10, 5, 12]
            }, {
                name: 'Resolved',
                data: [5, 10, 20, 15, 5, 7, 8]
            }, {
                name: 'In Progress',
                data: [5, 11, 10, 10, 10, 8, 15]
            }, {
                name: 'Fixed',
                data: [5, 9, 7, 20, 5, 10, 5]
            }]
        };
    }
    options: Object;
}