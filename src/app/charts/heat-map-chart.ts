import { Component, OnInit } from '@angular/core';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'heat-map-chart',
    template: `
    <div class="chart-container">
        <img *ngIf="isLoading" class="loading" src="./assets/images/loading.gif"/>
        <a class="back-btn" (click)="backButtonClick()">Back</a>
        <chart [options]="options"></chart>
    </div>
   `
})
export class HeatMapChart implements OnInit {
    private isLoading = true;
    private repoName = "";
    private historyFilters = [];
    backButtonClick() {
        console.log("History:", this.historyFilters);
    }
    drawChart(data) {
        this.options = this.bindChartOption("");
    }
    bindChartOption(res) {
        if (this.repoName != "" && this.repoName != res.repoName) {
            this.repoName = res.repoName;
        }
        let $this = this;
        let xCategories = [];
        let yCategories = [];
        let data = [];
        let clickableMap = [];
        if (res != null && res != "") {
            xCategories = res['dates']
            yCategories = res['files']
            let rawDatas = res['datas']
            if (xCategories != null && yCategories != null) {
                for (var x = 0; x < xCategories.length; x++) {
                    var xE = xCategories[x];
                    for (var y = 0; y < yCategories.length; y++) {
                        var yE = yCategories[y];
                        data.push([x, y, 0])
                        clickableMap.push([x, y, false]);
                        rawDatas.forEach(item => {
                            if (item['date'] == xE && item['file'] == yE) {
                                data.pop();
                                data.push([x, y, item['changes']])
                                clickableMap.pop();
                                clickableMap.push([x, y, (typeof item['folder'] != 'undefined' && item['folder'] && parseInt(item['changes']) > 0)]);
                            }
                        });

                    }
                }
            }
        }
        console.log("clickableMap", clickableMap);


        return {
            credits: {
                enabled: false
            },
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: 'Statistic of Changes vs TimeLine'
            },

            xAxis: {
                categories: xCategories
            },

            yAxis: {
                categories: yCategories,
                title: null
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: '#4472c4'
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> changed <br><b>' +
                        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            },

            series: [
                {
                    clickableData: clickableMap,
                    name: 'Statistic of Changes vs TimeLine',
                    borderWidth: 1,
                    data: data,
                    dataLabels: {
                        enabled: true,
                        color: '#000000'
                    },
                    events: {
                        click: function (e) {
                            if ($this.getClickAbleFromChart(e.point.x, e.point.y, e.point.series.userOptions.clickableData)) {
                                $this.isLoading = true;
                                let filterModel = {
                                    "repoName": e.point.series.yAxis.categories[e.point.y],
                                    "date": e.point.series.xAxis.categories[e.point.x],
                                    "folderName": ""
                                }
                                if (typeof $this.repoName != "undefined" && $this.repoName != "") {
                                    filterModel["repoName"] = $this.repoName;
                                    filterModel["folderName"] = e.point.series.yAxis.categories[e.point.y];
                                }
                                console.log("Clicked:", filterModel);
                                $this.historyFilters.push(filterModel);
                                $this._dataService.getHeatMapByFolderOrRepo(JSON.stringify(filterModel)).subscribe(res => {
                                    $this.options = $this.bindChartOption(res.chartData);
                                    $this.repoName = res.repoName;
                                    $this.isLoading = false;
                                },
                                    error => alert("Error: Can't get data !"),
                                    () => {
                                        console.log("Finish");
                                    }
                                );
                            }
                        }
                    }
                }]
        };
    }
    getClickAbleFromChart(x, y, clickableData) {
        let result = true;
        if (clickableData) {
            clickableData.forEach(item => {
                if (item[0] == x && item[1] == y) {
                    result = item[2];
                }
            });
        }
        return result;
    }
    ngOnInit(): void {
        this.drawChart("");
        let categories = [];
        let series = [];
        this._transferData.loadingGraph5DataSubject.subscribe(res => { this.isLoading = true });
        this._transferData.heatmapOfCommitDataSubject.subscribe(res => {
            this.options = this.bindChartOption(res);
            this.isLoading = false;
        });
    }
    constructor(private _transferData: TranserData, private _dataService: DataService) { }
    options: Object;
}