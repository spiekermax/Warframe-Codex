import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CycleStateData
{
    id?: string,
    expiry?: any
}

@Component({
    selector: 'cycle-state',
    template: `
    <div class="component-content">
        <div class="content-error" *ngIf="!this.getCycleState()">
            Slow or no Internet connection. If you have an Internet connection, just be patient.
        </div>
        <div class="content-container" *ngIf="this.getCycleState()">
            <ng-container *ngIf="this.cycleState[this.cycleStateDeterminer]">
                <div class="container-head">
                    <img [attr.src]="'assets/misc/' + this.cycleStateImageTrue">
                    <div class="head-bgblur" [style.background-image]="'url(../../assets/misc/' + this.cycleStateImageTrue + ')'"></div>
                </div>
                <h1>{{this.cycleStateNameTrue}}</h1>
            </ng-container>
            <ng-container *ngIf="!this.cycleState[this.cycleStateDeterminer]">
                <div class="container-head">
                    <img [attr.src]="'assets/misc/' + this.cycleStateImageFalse">
                    <div class="head-bgblur" [style.background-image]="'url(../../assets/misc/' + this.cycleStateImageFalse + ')'"></div>
                </div>
                <h1>{{this.cycleStateNameFalse}}</h1>
            </ng-container>

            <div class="container-timer" *ngIf="(this.cycleState.expiry - this.currentTime) >= 0">
                <!-- HOURS --> <ng-container *ngIf="this.formatTime(cycleState.expiry - this.currentTime).hrs != 0">
                    <span class="timer-digit">{{this.formatTime(cycleState.expiry - this.currentTime).hrs}}</span>
                    <span class="timer-unit">H&nbsp;&nbsp;</span>
                <!-- HOURS --> </ng-container>

                <!-- MINUTES -->
                    <span class="timer-digit">{{this.formatTime(cycleState.expiry - this.currentTime).min}}</span>
                    <span class="timer-unit">MIN&nbsp;&nbsp;</span>
                <!-- MINUTES -->
                
                <!-- SECONDS -->
                    <span class="timer-digit">{{this.formatTime(cycleState.expiry - this.currentTime).sec}}</span>
                    <span class="timer-unit">S</span>
                <!-- SECONDS -->
            </div>
            <div class="container-timer" *ngIf="(this.cycleState.expiry - this.currentTime) < 0">
                <p></p>
                <p class="timer-digit">SWITCHING...</p>
            </div>
        </div>
    </div>`
})
export class CycleStateComponent implements OnInit
{
    /* ATTRIBUTES */

    /**
     * The url to retrieve the cycle state data from.
     */
    @Input() public cycleStateSource: string;

    /**
     * The object attribute (boolean) that is determining for the cycle state switches.
     */
    @Input() public cycleStateDeterminer: string;

    /**
     * The name to display when the cycle state determiner returns true.
     */
    @Input() public cycleStateNameTrue: string;

    /**
     * The name to display when the cycle state determiner returns false.
     */
    @Input() public cycleStateNameFalse: string;

    /**
     * The image to display when the cylce state determiner returns true.
     */
    @Input() public cycleStateImageTrue: string;

    /**
     * The image to display when the cycle state determiner returns false.
     */
    @Input() public cycleStateImageFalse: string;

    /**
     * Stores the current time in milliseconds.
     */
    private currentTime: number = Date.now();

    /**
     * Holds the entire information retrieved as cycle state.
     */
    private cycleState: CycleStateData;


    /* LIFECYCLE */

    constructor(private http: HttpClient)
    {
        // Update time in mobile friendly frequency
        setInterval(() => {
            this.currentTime = Date.now();

            // Update cycle state once expired
            if(this.cycleState && (this.cycleState.expiry - this.currentTime) < 0) this.pullCycleState();
        }, 100);
    }

    public ngOnInit() : void
    {
        if(this.cycleState) return;

        this.pullCycleState();
    }


    /* METHODS */

    /**
     * Retrieves the cycle state from the provided url and updates the 'cycleState' attribute.
     */
    public async pullCycleState() : Promise<CycleStateData>
    {
        if(!this.cycleStateSource || this.cycleStateSource.trim() == "") return Promise.reject("Unspecified cycle source!");

        this.http.get(this.cycleStateSource).subscribe((data: any) => {
            this.cycleState = data;
            this.cycleState.expiry = Date.parse(this.cycleState.expiry);

            return Promise.resolve(this.cycleState);
        });
    }

    /**
     * Returns the current cycle state data.
     */
    public getCycleState() : any | undefined
    {
        return this.cycleState;
    }

    /**
     * Formats the given time in milliseconds into an object wiht seconds, minutes and hours.
     * @param msc The time in milliseconds.
     */
    public formatTime(msc: number) : object
    {
        const hrs = ~~( msc / 3600000 );
        const min = ~~( msc / 60000 - ( hrs * 60 ) );
        const sec = ~~( msc / 1000 - ( hrs * 3600 + min * 60 ) );

        return { hrs: hrs, min: min, sec: sec };
    }

};