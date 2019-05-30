import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface InvasionData
{
    node?: string,
    desc?: string,
    completed?: boolean,
    completion?: any,
    attackingFaction?: string,
    defendingFaction?: string,
    vsInfestation?: boolean,
    attackerReward?: {
        asString?: string
    },
    defenderReward?: {
        asString?: string
    }
    eta?: any
}

@Component({
    selector: 'invasion-state',
    template: `
    <div class="component-content">
        <div class="content-error" *ngIf="!this.getInvasions()">
            Slow or no Internet connection. If you have an Internet connection, just be patient.
        </div>
        <ng-container *ngIf="this.getInvasions()">
            <ng-container *ngFor="let invasion of this.getInvasions(); index as i;">
                <ng-container>
                    <h4>{{invasion.node}}</h4>
                    <p>{{invasion.desc}} - {{invasion.completion}}% - {{invasion.eta}} (ETA)</p>
                    <p class="content-rewards">Attack: {{invasion.attackingFaction}}<ng-container *ngIf="!invasion.vsInfestation"> - {{invasion.attackerReward.asString}}</ng-container></p>
                    <p class="content-rewards">Defense: {{invasion.defendingFaction}} - {{invasion.defenderReward.asString}}</p>
                    <hr *ngIf="i != this.getInvasions().length - 1" class="content-seperator">
                </ng-container>
            </ng-container>
        </ng-container>
    </div>`
})
export class InvasionStateComponent implements OnInit
{
    /* ATTRIBUTES */

    /**
     * The URL to retrieve the invasion data from.
     */
    @Input() public invasionSource: string;

    /**
     * Holds the entire information retrieved as invasion state.
     */
    private invasionState: Array<InvasionData>;

    
    /* LIFECYCLE */

    constructor(private http: HttpClient) {}

    public ngOnInit() : void
    {
        if(this.invasionState) return;

        this.pullInvasions();
    }


    /* METHODS */

    /**
     * Retrieves the cycle state from the provided url and updates the 'alertState' attribute.
     */
    public async pullInvasions() : Promise<Array<InvasionData>>
    {
        if(!this.invasionSource || this.invasionSource.trim() == "") return Promise.reject("Unspecified invasion source!");

        this.http.get(this.invasionSource).subscribe((data: any) => {
            this.invasionState = data.filter((inv) => !inv.completed);
            for(var i = 0; i < this.invasionState.length; ++i)
            {
                this.invasionState[i].completion = this.invasionState[i].completion.toFixed(2);
            }

            return Promise.resolve(this.invasionState);
        });
    }

    /**
     * Returns the current alert state data.
     */
    public getInvasions() : Array<InvasionData> | undefined
    {
        return this.invasionState;
    }
}