import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { SelectModule } from 'angular2-select';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';
import { Util } from '../utils/util';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'filter-component',
    templateUrl: './fiter_template.html'
})
export class Filter implements OnInit {
    static get parameters() {
        return [[TranserData], [DataService], [Util], [ToasterService]];
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

    startDate; endDate;
    onInputChange(value: string, key: string) {
        this[key] = value;
    }
    isValidForm() {
        let isValid = true;
        if (this.releaseVersionModel == null || this.releaseVersionModel == "") {
            isValid = false;
        }
        return isValid;
    }
    generateChart() {
        let filterModel = {};
        filterModel['releaseVersionModel'] = this.releaseSelected["release_verson"];
        if (this.startDate && this.startDate != "") {
            filterModel['startDate'] = this.startDate;
        }
        if (this.endDate && this.endDate != "") {
            filterModel['endDate'] = this.endDate;
        }
        if (this.reposModel && this.reposModel.length > 0) {
            filterModel['reposModel'] = this.reposModel;
        }
        if (this.branchesModel && this.branchesModel.length > 0) {
            filterModel['branchesModel'] = this.branchesModel;
        }
        if (this.usersModel && this.usersModel.length > 0) {
            filterModel['usersModel'] = this.usersModel;
        }
        console.log(filterModel);
        if (typeof Storage !== "undefined") {
            let dataStoraged = sessionStorage.getItem(JSON.stringify(filterModel));
            if (dataStoraged != null) {
                let datas = JSON.parse(dataStoraged);
                this._transferData.updateChartFileChangeCommitData(datas[0]);
                this._transferData.updateChartJiraStatusCommitData(datas[1]);
                this._transferData.updateLineChangeOfCommitData(datas[2]);
                this._transferData.updateJiraTypeOfCommitData(datas[3]);
                this._transferData.updateHeatMapOfCommitData(datas[4]);
                this._transferData.updateJiraDefectOfCommitData(datas[5]);
            } else {
                this.callApi(filterModel);
            }
        }

    }
    callApi(filterModel) {
        this._transferData.updateLoadingGraph(true);
        this._dataService.getChartData(JSON.stringify(filterModel)).subscribe(res => {
            this._transferData.updateChartFileChangeCommitData(res[0]);
            this._transferData.updateChartJiraStatusCommitData(res[1]);
            this._transferData.updateLineChangeOfCommitData(res[2]);
            this._transferData.updateJiraTypeOfCommitData(res[3]);
            this._transferData.updateHeatMapOfCommitData(res[4]);
            this._transferData.updateJiraDefectOfCommitData(res[5]);

            if (typeof Storage !== "undefined") {
                sessionStorage.setItem(JSON.stringify(filterModel), JSON.stringify(res));
            }
        },
            error => alert("Error: Can't get chart data for graph"),
            () => {
                console.log("Finish");
            }
        );
    }

    ngOnInit() {
        //users       
        this._dataService.getUsesByRepo(JSON.stringify(this.reposModel)).subscribe(res => {
            this.users = res;
        },
            error => this._toasterService.pop('error', 'Error', "Can't get users data by repositories !"),
            () => {
                console.log("Finish");
            }
        );
        // list release
        this._dataService.getListRelease().subscribe(res => {
            console.log(res);
            this.makeUpReleaseData(res);
        },
            error => this._toasterService.pop('error', 'Error', "Can't get list release !"),
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
        this.startDate = this.releaseSelected["start_date"];
        this.endDate = this.releaseSelected["end_date"];

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
        //Branches
        this.branchesModel = [];
        let branchesTemp = [];
        console.log(this.releaseSelected);
        if (this.releaseSelected && this.releaseSelected['services']) {
            this.releaseSelected['services'].forEach(srv => {
                this.reposModel.forEach(rp => {
                    if (srv['repo'] == rp) {
                        Object.keys(srv['branch']).map(function (item, index) {
                            console.log(item, index);
                            branchesTemp.push({ "id": rp + "#" + item, "name": "[" + rp + "] " + item });
                        });
                    }
                });
            });
        }
        debugger;
        this.branches = branchesTemp;
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
    constructor(private _transferData: TranserData, private _dataService: DataService, private _util: Util, private _toasterService: ToasterService) {

    }
}