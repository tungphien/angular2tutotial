import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'angular2-select';
import { TranserData } from '../services/transerData.service';
import { DataService } from '../services/dataServices';

@Component({
    selector: 'filter-component',
    templateUrl: './fiter_template.html'
})
export class Filter implements OnInit {
    static get parameters() {
        return [[TranserData], [DataService]];
    }
    releaseVersionModel: string='1.0';
    releaseVersions:any;
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
    onChangeReleaseVersion(item)
    {
        console.log('onChangeReleaseVersion', this.releaseVersionModel);
        console.log('@@@', item.value);
        this.releaseVersionModel=item.value;
    }
    generateChart() {
        let filterModel = {};
        filterModel['releaseVersionModel'] = this.releaseVersionModel;
        filterModel['startDate'] = this.startDate;
        filterModel['endDate'] = this.endDate;
        filterModel['reposModel'] = this.reposModel;
        filterModel['branchesModel'] = this.branchesModel;
        filterModel['usersModel'] = this.usersModel;
        console.log(filterModel);
        this._transferData.updateLoadingGraph1(true);
        this._transferData.updateLoadingGraph2(true);
        // this._transferData.updateLoadingGraph3(true);
        // this._transferData.updateLoadingGraph4(true);
        // this._transferData.updateLoadingGraph5(true);
        // this._transferData.updateLoadingGraph6(true);
        this._dataService.getChartData(JSON.stringify(filterModel)).subscribe(res => {
            this._transferData.updateChartFileChangeCommitData(res[0]);
            this._transferData.updateChartJiraStatusCommitData(res[1]);
            // this._transferData.updateLineChangeOfCommitData(res[2]);
            // this._transferData.updateJiraTypeOfCommitData(res[3]);
            // this._transferData.updateHeatMapOfCommitData(res[4]);
            // this._transferData.updateJiraDefectOfCommitData(res[5]);
        },
            error => alert("error: Can't get chart data for graph"),
            () => {
                console.log("Finish");
            }
        );
       
    }

    ngOnInit() {        
        this.releaseVersions = [{ label: "Release 1.0", value: "1.0" }, { label: "Release 1.1", value: "1.1" }, { label: "Release 1.2", value: "1.2" }];
        this.repos = [
            { id: 'http://gerrit-server:8080/Nutanix.git#john#johnldap', name: 'Gerrit Local' },
            { id: 'http://52.53.239.241:8080/Nutanix#test1#test1', name: 'Gerrit Server' }           
        ];
        this.branches = [
            { id: 'http://gerrit-server:8080/Nutanix.git#master', name: 'Gerrit Local: master' },
            { id: 'http://52.53.239.241:8080/Nutanix#master', name: 'Gerrit Server: master' }           
        ];
        this.users = [
            { id: 'http://gerrit-server:8080/Nutanix.git#user1', name: 'Gerrit Local: User 1' },
            { id: 'http://gerrit-server:8080/Nutanix.git#user2', name: 'Gerrit Local: User 2' },
            { id: 'http://52.53.239.241:8080/Nutanix#user1', name: 'Gerrit Server: User 1' },
            { id: 'http://52.53.239.241:8080/Nutanix#user2', name: 'Gerrit Server: User 2' },
            { id: 'http://52.53.239.241:8080/Nutanix#user3', name: 'Gerrit Server: User 3' },
        ];
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
        displayAllSelectedText: true
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
    constructor(private _transferData: TranserData, private _dataService: DataService) { }
}