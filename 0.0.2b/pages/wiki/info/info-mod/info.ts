import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-mod-info',
    templateUrl: 'info.html'
})
export class ModInfoPage
{
    /* ATTRIBUTES */

    public modObject = {
        name: undefined,
        img: undefined,
        enemyDrops: undefined,
        missionDrops: undefined,
        questDrops: undefined,
        isNonSentinel: undefined
    }
    public owned: boolean = false;


    /* LIFECYCLE */

    constructor(private navParams: NavParams, private storage: Storage)
    {
        for(var modAttribute in this.modObject)
        {
            this.modObject[modAttribute] = this.navParams.data[modAttribute];
        }
        
        this.storage.get("mod-" + this.modObject.name + "-owned").then((isOwned: boolean) => {
            this.owned = isOwned;
        });
    }

    public onOwnedClicked() : void
    {
        this.storage.set("mod-" + this.modObject.name + "-owned", this.owned);
    }
    
};