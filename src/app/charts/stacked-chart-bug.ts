import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'stacked-chart-bug',
    template: `
       <chart id="stacked-chart-bug" [options]="options"></chart>
   `
})
export class StackedChartBug implements OnInit {
    options: Object;
    resultArray = [];
    static get parameters() {
        return [[DataService]];
    }
    recievedData(data){
        console.log('StackedChartBug', data);       
    }
    ngOnInit(): any {
        console.log("test")
        this._dataService.getCommits("").subscribe(response => {
            console.log(response)
            var i = 0;
            response.forEach(element => {
                if (i < 10) {
                    console.log("element", element);
                    this.resultArray.push(element['alpha3Code'])
                }
                i++;
            });
            this.drawChart(this.resultArray);
        });
    }
    drawChart(data) {
        console.log("drawChart", data);
        var categories = [];
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            categories.push(element);
        }
        var seriesData = [{
            name: 'New',
            data: [5, 10, 13, 15, 10, 5, 12, 5, 10, 13]
        }, {
            name: 'Resolved',
            data: [5, 10, 20, 15, 5, 7, 8, 5, 10, 13]
        }, {
            name: 'In Progress',
            data: [5, 11, 10, 10, 10, 8, 15, 5, 10, 13]
        }, {
            name: 'Fixed',
            data: [5, 9, 7, 20, 5, 10, 5, 5, 10, 13]
        }]

        this.options = {
            credits: {
                enabled: false
            },
            colors: ['#ffc000','#a5a5a5','#ed7d31','#4472c4'],
            chart: {
                type: 'column'

            },
            title: {
                text: 'Bugs VS Timeline'
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
            series: seriesData
        };
    }
    constructor(public _dataService: DataService) { }
}