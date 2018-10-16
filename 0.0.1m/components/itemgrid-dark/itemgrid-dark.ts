import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'itemgrid-dark',
    template: `
    <ng-container *ngIf="this.getFilteredItems() && this.getFilteredItems().length != 0">
        <span *ngIf="this.title" class="itemgrid-dark-title">{{this.title}}</span>
        <ul class="itemgrid-dark-grid">
            <li *ngFor="let item of this.getFilteredItems()" (click)="this.onItemClick(item)">
                <img src={{item.img}}>
                <span [style.fontSize]="item.fontSize">{{item.name}}</span>
            </li>
        </ul>
    </ng-container>`
})
export class ItemGridDarkComponent
{
    @Input() title: string = "";
    @Input() itemSource: string;
    @Input() itemFilter: string = "";
    @Output() itemClick = new EventEmitter();

    itemData: Array<{}>;

    constructor(public http: HttpClient) {}

    ngOnInit()
    {
        if(this.itemData) return;

        this.initItems();
    }

    onItemClick(eventData)
    {
        this.itemClick.emit(eventData);
    }

    initItems()
    {
        if(!this.itemSource || this.itemSource.trim() == "") return;

        this.http.get(this.itemSource).subscribe((data: any)=>{
            this.itemData = data;
        });
    }

    getFilteredItems()
    {
        if(!this.itemData || !this.itemFilter || this.itemFilter.trim() == "") return this.itemData;

        let items = this.itemData.filter((item: any) => {
            return (item.name.toLowerCase().indexOf(this.itemFilter.toLowerCase()) > -1);
        });
        return items;
    }
}