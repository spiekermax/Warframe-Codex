import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'itemgrid-pure',
    template: `
    <ng-container *ngIf="this.getFilteredSourceItems() && this.getFilteredSourceItems().length != 0">
        <span *ngIf="this.sourceTitle" class="itemgrid-pure-title">{{this.sourceTitle}}</span>
        <ul class="itemgrid-pure-grid">
            <li *ngFor="let mod of this.getFilteredSourceItems()" (click)="this.onItemClick(mod)">
                <img src={{mod.img}}>
            </li>
        </ul>
    </ng-container>`
})
export class ItemGridPureComponent implements OnInit
{
    /* ATTRIBUTES */

    /**
     * The title of the "base items" to display.
     */
    @Input() public sourceTitle: string;

    /**
     * The relative filepath of the "base items" JSON.
     */
    @Input() public itemSource: string;

    /**
     * The given function is applied so only specified items will display.
     */
    @Input() public itemMask: Function = () => { return true };

    /**
     * Filters the items by name (only matching names will be displayed).
     */
    @Input() public itemFilter: string = "";

    /**
     * 'On-Click' event which can be fired by any item displayed.
     */
    @Output() public itemClick = new EventEmitter();

    /**
     * The "base item data". Required to make use of this component! Holds one Array of multiple JSON-objects.
     */
    private sourceItemData: any;


    /* LIFECYCLE */

    constructor(private http: HttpClient) { }

    public ngOnInit() : void
    {
        if(this.sourceItemData) return; // If 'this.initItems()' was already called once, do not call it again! (-> Prevent unnecessary updates)

        // Fetch item data from the given sources.
        this.initItems();
    }

    public onItemClick(eventData) : void
    {
        this.itemClick.emit(eventData); // Fire 'On-Click' event.
    }


    /* METHODS */

    private initItems() : void
    {
        if(!this.itemSource || this.itemSource.trim() == "") return; // If no base-item-source exists, this component has no use (displays nothing)!

        this.http.get(this.itemSource).subscribe((rawSourceData: any) =>
        {
            // Copy source data.
            this.sourceItemData = rawSourceData; // ref-assignment
        });
    }

    public getFilteredSourceItems() : any
    {
        if(!this.sourceItemData) return this.sourceItemData;
        if(!this.itemFilter || this.itemFilter.trim() == "") return this.sourceItemData.filter(this.itemMask);
        
        let items = this.sourceItemData.filter(this.itemMask);
        items = items.filter((item: any) => {
            return item.name.toLowerCase().includes(this.itemFilter.toLowerCase());
        });
        return items;
    }
}