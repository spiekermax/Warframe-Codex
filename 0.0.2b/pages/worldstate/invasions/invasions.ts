import { Component, ViewChild } from '@angular/core';
import { AppStateProvider } from '../../../providers/app-state';

@Component({
    selector: 'page-invasions',
    templateUrl: 'invasions.html'
})
export class InvasionsPage
{
    @ViewChild("invasionsPC") private invasionsPC;
    @ViewChild("invasionsXB1") private invasionsXB1;
    @ViewChild("invasionsPS4") private invasionsPS4;
    @ViewChild("invasionsSWI") private invasionsSWI;
    public userPlatform: string = "pc";

    constructor(public appState: AppStateProvider)
    {
        appState.getUserPlatform().then((platform: string) => {
            if(platform) this.userPlatform = platform;
        });
    }

    public refreshAlerts(refresher) : void
    {
        switch(this.userPlatform)
        {
            case "pc":
                this.invasionsPC.pullInvasions().then(() => {
                    refresher.complete();
                });
                break;
            case "xb1":
                this.invasionsXB1.pullInvasions().then(() => {
                    refresher.complete();
                });
                break;
            case "ps4":
                this.invasionsPS4.pullInvasions().then(() => {
                    refresher.complete();
                });
                break;
            case "swi":
                this.invasionsSWI.pullInvasions().then(() => {
                    refresher.complete();
                });
                break;
        }
    }
};