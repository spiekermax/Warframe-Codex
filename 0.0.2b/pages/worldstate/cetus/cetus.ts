import { Component } from '@angular/core';
import { AppStateProvider } from '../../../providers/app-state';

@Component({
    selector: 'page-cetus',
    templateUrl: 'cetus.html'
})
export class CetusPage
{
    public userPlatform: string = "pc";

    constructor(public appState: AppStateProvider)
    {
        appState.getUserPlatform().then((platform: string) => {
            if(platform) this.userPlatform = platform;
        });
    }
};