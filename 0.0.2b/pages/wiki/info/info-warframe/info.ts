import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-warframes-info',
    templateUrl: 'info.html'
})
export class WarframesInfoPage
{
    /* ATTRIBUTES */

    public warframeObject = {
        id: undefined,
        name: undefined,
        img: undefined,
        description: undefined,
        mastery: undefined,
        health: undefined,
        shield: undefined,
        armor: undefined,
        energy: undefined,
        speed: undefined,
        polarities: undefined,
        auraPolarity: undefined,
        abilities: undefined,
        passive: undefined
    }    
    public owned: boolean = false;


    /* LIFECYCLE */

    constructor(private navParams: NavParams, private storage: Storage)
    {
        for(var warframeAttribute in this.warframeObject)
        {
            this.warframeObject[warframeAttribute] = this.navParams.data[warframeAttribute];
        }

        this.storage.get("warframe-" + this.warframeObject.name + "-owned").then((isOwned: boolean) => {
            this.owned = isOwned;
        });
    }

    public onOwnedClicked() : void
    {
        this.storage.set("warframe-" + this.warframeObject.name + "-owned", this.owned);
    }


    /* METHODS */

    public isDeltaArray(arg: any) : boolean
    {
        if(!Array.isArray(arg)) return false;

        const lastElement = arg[arg.length - 1];
        return (lastElement == "+" || lastElement == "m" || lastElement == "-");
    }
    
};