import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-sentinel-info',
    templateUrl: 'info.html'
})
export class SentinelInfoPage
{
    /* ATTRIBUTES */

    public sentinelObject = {
        id: undefined,
        name: undefined,
        img: undefined,
        description: undefined,
        health: undefined,
        shield: undefined,
        armor: undefined,
        range: undefined,
        polarities: undefined,
        weapon: undefined
    }
    public owned: boolean = false;


    /* LIFECYCLE */

    constructor(private navParams: NavParams, private storage: Storage)
    {
        for(var sentinelAttribute in this.sentinelObject)
        {
            this.sentinelObject[sentinelAttribute] = this.navParams.data[sentinelAttribute];
        }
        
        this.storage.get("sentinel-" + this.sentinelObject.name + "-owned").then((isOwned: boolean) => {
            this.owned = isOwned;
        });
    }

    public onOwnedClicked() : void
    {
        this.storage.set("sentinel-" + this.sentinelObject.name + "-owned", this.owned);
    }


    /* METHODS */

    public isDeltaArray(arg: any) : boolean
    {
        if(!Array.isArray(arg)) return false;

        const lastElement = arg[arg.length - 1];
        return (lastElement == "+" || lastElement == "m" || lastElement == "-");
    }
    
};