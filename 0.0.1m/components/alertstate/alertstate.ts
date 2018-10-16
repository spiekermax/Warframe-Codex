import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'alert-state',
    template: `
    <div class="component-content">
        <div class="content-error" *ngIf="!this.getAlerts()">
            Slow or no Internet connection. If you have an Internet connection, just be patient.
        </div>
        <ng-container *ngIf="this.getAlerts()">
            <ng-container *ngFor="let alert of this.getAlerts(); index as i;">
                <ng-container *ngIf="(alert.expiry - this.currentTime) > 0">
                    <h4>{{alert.mission.node}}</h4>
                    <p>{{alert.mission.type}} - {{this.formatTime(alert.expiry - this.currentTime)}}</p>
                    <p class="content-reward">{{alert.mission.reward.asString}}</p>
                    <hr *ngIf="i != this.getAlerts().length - 1" class="content-seperator">
                </ng-container>
            </ng-container>
        </ng-container>
    </div>`
})
export class AlertStateComponent
{
    @Input() alertSource: string;
    currentTime: number = Date.now();
    alertState: Array<any>;

    constructor(public http: HttpClient)
    {
        // Update time
        setInterval(()=>{
            this.currentTime = Date.now();
        }, 100);
    }

    ngOnInit()
    {
        if(this.alertState) return;

        this.pullAlerts();
    }

    pullAlerts(onDataRecieved: Function = ()=>{})
    {
        if(!this.alertSource || this.alertSource.trim() == "") return;

        this.http.get(this.alertSource).subscribe((data: any)=>{
            this.alertState = data;
            for(let i = 0; i < this.alertState.length; ++i)
            {
                this.alertState[i].expiry = Date.parse(this.alertState[i].expiry);
            }
            onDataRecieved();
        });
        return this.alertState;
    }

    getAlerts()
    {
        return this.alertState;
    }

    formatTime(ms)
    {
        let hrs = ~~(ms / 3600000);
        let min = ~~(ms / 60000 - (hrs * 60));
        let sec = ~~(ms / 1000 - (hrs * 3600 + min * 60));

        if(hrs == 0) return min.toString() + "min " + sec.toString() + "s";
        return hrs.toString() + "h " +  min.toString() + "min " + sec.toString() + "s"; 
    }
};