import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
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
    reposModel: number[];
    repos: IMultiSelectOption[];
    branchesModel: number[];
    branches: IMultiSelectOption[];
    usersModel: number[];
    users: IMultiSelectOption[];

    startDate; endDate;
    onInputChange(value: string, key: string) {
        this[key] = value;       
    }
    generateChart() {
        let filterModel = {};
        filterModel['startDate'] = this.startDate;
        filterModel['endDate'] = this.endDate;
        filterModel['reposModel'] = this.reposModel;
        filterModel['branchesModel'] = this.branchesModel;
        filterModel['usersModel'] = this.usersModel;
        console.log(filterModel);
        this._dataService.getFilesChangeOfCommits(JSON.stringify(filterModel)).subscribe(res => {
            this._transferData.updateChartFileChangeCommitData(res);
        },
            error => alert("error"),
            () => {
                console.log("Finish");
            }
        );

        this._dataService.getJiraStatusOfCommits(JSON.stringify(filterModel)).subscribe(res => {
            this._transferData.updateChartJiraStatusCommitData(res);
        },
            error => alert("error"),
            () => {
                console.log("Finish");
            }
        );
    }

    ngOnInit() {
        this.repos = [
            { id: 'http://gerrit-server:8080/Nutanix.git', name: 'Nutanix gerrit local' },
            { id: 2, name: 'Resporitory 2' },
            { id: 3, name: 'Resporitory 3' },
            { id: 4, name: 'Resporitory 4' },
        ];
        this.branches = [
            { id: 'master', name: 'Nutanix gerrit local: master' },
            { id: 2, name: 'Resporitory 1: Branches 1' },
            { id: 3, name: 'Resporitory 2: master' },
            { id: 4, name: 'Resporitory 2: Branches 1' },
            { id: 5, name: 'Resporitory 2: Branches 2' },
        ];
        this.users = [
            { id: 1, name: 'Nutanix gerrit local: User 1' },
            { id: 2, name: 'Resporitory 1: User 2' },
            { id: 3, name: 'Resporitory 2: User 1' },
            { id: 4, name: 'Resporitory 2: User 2' },
            { id: 5, name: 'Resporitory 2: User 3' },
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