import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'itemgrid-framed',
    template: `
    <ng-container *ngIf="this.getFilteredSourceItems() && this.getFilteredSourceItems().length != 0">
        <span *ngIf="this.sourceTitle" class="itemgrid-framed-title">{{this.sourceTitle}}</span>
        <ul class="itemgrid-framed-grid">
            <li *ngFor="let item of this.getFilteredSourceItems()" (click)="this.onItemClick(item)">
                <img src={{item.img}}>
                <span [style.fontSize]="item.fontSize">{{item.name}}</span>
            </li>
        </ul>
    </ng-container>
    <ng-container *ngFor="let extends of this.extensionsData; let i = index;">
        <ng-container *ngIf="this.getFilteredExtensionItems(i) && this.getFilteredExtensionItems(i).length != 0">
            <span *ngIf="this.extensionTitles[i]" class="itemgrid-framed-title">{{this.extensionTitles[i]}}</span>
            <ul class="itemgrid-framed-grid">
                <li *ngFor="let item of this.getFilteredExtensionItems(i)" (click)="this.onItemClick(item)">
                    <img src={{item.img}}>
                    <span [style.fontSize]="item.fontSize">{{item.name}}</span>
                </li>
            </ul>
        </ng-container>
    </ng-container>`
})
export class ItemGridFramedComponent implements OnInit
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
     * An ordered list of the titles for the according "extension items" [index(title) = index(extensionSource)].
     */
    @Input() public extensionTitles: Array<string>;

    /**
     * An ordered list of the relative filepaths of the "extension items".
     */
    @Input() public itemExtensions: Array<string>;

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

    /**
     * The "extension item datas". Optional. Holds multiple Arrays (extensions) holding multiple JSON-objects (one extension).
     */
    private extensionsData: any;


    /* LIFECYCLE */

    constructor(private http: HttpClient) {}

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
            // Copy the source data.
            this.sourceItemData = rawSourceData; // ref-assignment

            // If no extensions are specified we are done.
            if(!this.itemExtensions) return;

            // Fetch extension data
            this.extensionsData = new Array; // Array of Arrays holding JSON data.

            // Iterate through all extensions.
            for(var n = 0; n < this.itemExtensions.length; ++n)
            {
                let extensionItemData = new Array; // Array holding JSON data for the current extension.
                let rawSourceDataCopy = JSON.parse(JSON.stringify(rawSourceData)); // deep-copy

                this.http.get(this.itemExtensions[n]).subscribe((rawExtensionItemData: any) =>
                {
                    // Iterate through all items of the current extension.
                    for(var i = 0; i < rawExtensionItemData.length; ++i)
                    {
                        // Merge with unchanged source data.
                        let parentItem = rawSourceDataCopy.find((item: any) => { return item.id == rawExtensionItemData[i].id });
                        if(parentItem)
                        {
                            Object.assign(parentItem, rawExtensionItemData[i]);
                            extensionItemData.push(parentItem);
                        }
                        else extensionItemData.push(rawExtensionItemData[i]);
                    }
                });

                this.extensionsData.push(extensionItemData);
            }
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

    public getFilteredExtensionItems(extensionIndex: number) : any
    {
        if(!this.extensionsData[extensionIndex]) return this.extensionsData[extensionIndex];
        if(!this.itemFilter || this.itemFilter.trim() == "") return this.extensionsData[extensionIndex].filter(this.itemMask);

        let items = this.extensionsData[extensionIndex].filter(this.itemMask);
        items = items.filter((item: any) => {
            return item.name.toLowerCase().includes(this.itemFilter.toLowerCase());
        });
        return items;
    }
}