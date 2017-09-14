import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { StackedChartBug } from '../charts/stacked-chart-bug';
import { StackedChartCommit } from '../charts/stacked-chart-commit';

@Component({
    selector: 'filter-component',
    templateUrl: './fiter_template.html'
})
export class Filter implements OnInit {
    static get parameters() {
        return [[StackedChartCommit]];
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
        console.log(this[key]);
    }
    generateChart() {        
        let filterModel={};
        filterModel['startDate']=this.startDate;
        filterModel['endDate']=this.endDate;
        filterModel['reposModel']=this.reposModel;
        filterModel['branchesModel']=this.branchesModel;
        filterModel['usersModel']=this.usersModel;
        console.log(filterModel);
        
        this._stackedChartCommit.recievedData(filterModel);      
    }

    ngOnInit() {
        this.repos = [
            { id: 1, name: 'Resporitory 1' },
            { id: 2, name: 'Resporitory 2' },
            { id: 3, name: 'Resporitory 3' },
            { id: 4, name: 'Resporitory 4' },
        ];
        this.branches = [
            { id: 1, name: 'Resporitory 1: master' },
            { id: 2, name: 'Resporitory 1: Branches 1' },
            { id: 3, name: 'Resporitory 2: master' },
            { id: 4, name: 'Resporitory 2: Branches 1' },
            { id: 5, name: 'Resporitory 2: Branches 2' },
        ];
        this.users = [
            { id: 1, name: 'Resporitory 1: User 1' },
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
        dynamicTitleMaxItems: 2,
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
    constructor(public _stackedChartCommit: StackedChartCommit) { }
}