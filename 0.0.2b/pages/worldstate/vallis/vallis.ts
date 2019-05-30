import { Component } from '@angular/core';
import { AppStateProvider } from '../../../providers/app-state';

@Component({
    selector: 'page-vallis',
    templateUrl: 'vallis.html'
})
export class VallisPage
{
    public userPlatform: string = "pc";

    constructor(public appState: AppStateProvider)
    {
        appState.getUserPlatform().then((platform: string) => {
            if(platform) this.userPlatform = platform;
        });
    }
};