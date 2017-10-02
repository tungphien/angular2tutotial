import { Component, Input } from '@angular/core';
@Component({
    selector: "loading",
    template: `<img *ngIf="isLoading" class="loading" src="./assets/images/loading.gif"/>`
})

export class Loading {
    @Input() isLoading: boolean;
}

