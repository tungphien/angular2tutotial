import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { SelectModule } from 'angular2-select';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';
import { Util } from '../utils/util';
var config = require('../json/config.json');

@Component({
    selector: 'filter-component',
    templateUrl: './fiter_template.html'
})
export class Filter implements OnInit {
    static get parameters() {
        return [[TranserData], [DataService], [Util]];
    }
    releaseSelected: any;
    releaseVersions = [];
    releaseVersionModel: string;
    reposModel: string[];
    repos: IMultiSelectOption[];
    branchesModel: string[];
    branches: IMultiSelectOption[];
    usersModel: string[];
    users: IMultiSelectOption[];
    enableDepenRepo = false;

    startDate; endDate;
    onInputChange(value: string, key: string) {      
        this[key] = value;
    }
    generateChart() {
        let filterModel = {};
        filterModel['releaseVersionModel'] = this.releaseSelected["release_verson"];
        filterModel['startDate'] = this.startDate;
        filterModel['endDate'] = this.endDate;
        filterModel['reposModel'] = this.reposModel;
        filterModel['branchesModel'] = this.branchesModel;
        filterModel['usersModel'] = this.usersModel;
        console.log(filterModel);
        this._transferData.updateLoadingGraph1(true);
        this._transferData.updateLoadingGraph2(true);
        this._transferData.updateLoadingGraph3(true);
        this._transferData.updateLoadingGraph4(true);
        this._transferData.updateLoadingGraph5(true);
        this._transferData.updateLoadingGraph6(true);
        this._dataService.getChartData(JSON.stringify(filterModel)).subscribe(res => {
            this._transferData.updateChartFileChangeCommitData(res[0]);
            this._transferData.updateChartJiraStatusCommitData(res[1]);
            this._transferData.updateLineChangeOfCommitData(res[2]);
            this._transferData.updateJiraTypeOfCommitData(res[3]);
            this._transferData.updateHeatMapOfCommitData(res[4]);
            this._transferData.updateJiraDefectOfCommitData(res[5]);
        },
            error => alert("Error: Can't get chart data for graph"),
            () => {
                console.log("Finish");
            }
        );

    }

    ngOnInit() {
        // this.repos = [];
        //let rps = [];
        // this._dataService.getAllRepositoties().subscribe(res => {
        //     res.forEach(r => {
        //         rps.push({ "id": r, "name": r })
        //     });
        //     this.repos = rps;
        // },
        //     error => alert("Error: Can't get repositories !"),
        //     () => {
        //         console.log("Finish");
        //     }
        // );
        //this.branches = [];

        //users       
        this._dataService.getUsesByRepo(JSON.stringify(this.reposModel)).subscribe(res => {
            this.users = res;
        },
            error => alert("Error: Can't get users data by repositories !"),
            () => {
                console.log("Finish");
            }
        );
        // list release
        this._dataService.getListRelease().subscribe(res => {
            console.log(res);
            this.makeUpReleaseData(res);
        },
            error => alert("Error: Can't get list release !"),
            () => {
                console.log("Finish");
            }
        );
    }
    makeUpReleaseData(res) {
        let listData = [];
        if (res) {
            res.forEach(item => {
                listData.push({ label: item["release_name"], value: JSON.stringify(item) });
            });
        }
        this.releaseVersions = listData;
    }
    onChangeReleaseVersion(item) {       
        this.releaseSelected = JSON.parse(item.value);
        this.releaseVersionModel = item.value;

        //format and set start and end date        
        this.startDate = this._util.convertDate(this.releaseSelected["start_date"]);
        this.endDate = this._util.convertDate(this.releaseSelected["end_date"]);

        // update repo by release        
        if (this.releaseSelected['services']) {
            let rps = []
            this.releaseSelected['services'].forEach(service => {
                rps.push({ "id": service['repo'], "name": service['repo'] });

            });
            this.repos = rps;
        }

    }
    onRepoChange() {
        console.log(this.reposModel);
        this.enableDepenRepo = false;
        //Branches
        this.branchesModel = [];
        this._dataService.getBranchesByRepo(JSON.stringify(this.reposModel)).subscribe(res => {
            this.branches = res;
            if (res.length > 0)
                this.enableDepenRepo = true;
        },
            error => alert("Error: Can't get braches data by repositories !"),
            () => {
                console.log("Finish");
            }
        );

    }
    onChange() {
        console.log(this.reposModel);
    }

    // Settings configuration
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        // checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 1,
        displayAllSelectedText: true,
        autoUnselect: true
    };

    // Text configuration
    myTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        searchEmptyResult: 'Nothing found...',
        searchNoRenderText: 'Type in search box to see results...',
        defaultTitle: 'Select',
        allSelected: 'All selected',
    };
    constructor(private _transferData: TranserData, private _dataService: DataService, private _util: Util) { }
}