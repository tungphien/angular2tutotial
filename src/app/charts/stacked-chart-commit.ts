import { Component } from '@angular/core';

@Component({
    selector: 'stacked-chart-commit',
    template: `
       <chart [options]="options"></chart>
   `
})
export class StackedChartCommit {
    constructor() {
        this.options = {
            colors:['#ed7d31','#4472c4'],
            chart: {
                type: 'column'
            },
            title: {
                text: 'Commits VS Time Line'
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
                name: 'New Files',
                data: [120, 140, 108, 200, 184, 152, 80]
            }, {
                name: 'Modified files',
                data: [180, 210, 162, 300, 276, 228, 120]
            }]
        };
    }
    options: Object;
}