import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'itemgrid-framed',
    template: `
    <ng-container *ngIf="this.getFilteredItems() && this.getFilteredItems().length != 0">
        <span *ngIf="this.title" class="itemgrid-framed-title">{{this.title}}</span>
        <ul class="itemgrid-framed-grid">
            <li *ngFor="let item of this.getFilteredItems()" (click)="this.onItemClick(item)">
                <img src={{item.img}}>
                <span [style.fontSize]="item.fontSize">{{item.name}}</span>
            </li>
        </ul>
    </ng-container>`
})
export class ItemGridFramedComponent
{
    @Input() title: string;
    @Input() itemSource: string;
    @Input() itemExtend: string;
    @Input() itemFilter: string = "";
    @Output() itemClick = new EventEmitter();

    itemData: any;

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

        this.http.get(this.itemSource).subscribe((sourceData: any) => {

            if(!this.itemExtend || this.itemExtend.trim() == "")
            {
                this.itemData = sourceData;
                return;
            }

            this.itemData = new Array;
            this.http.get(this.itemExtend).subscribe((extendData: any) => {
                for(let i = 0; i < sourceData.length; ++i)
                {
                    let match = extendData.find((item: any) => {return sourceData[i].id == item.id});
                    if(!match) continue;

                    Object.assign(sourceData[i], match);
                    this.itemData.push(sourceData[i]);
                }
            });
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