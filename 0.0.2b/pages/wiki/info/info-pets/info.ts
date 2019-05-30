import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-pet-info',
    templateUrl: 'info.html'
})
export class PetInfoPage
{
    /* ATTRIBUTES */

    public petObject = {
        id: undefined,
        name: undefined,
        img: undefined,
        description: undefined,
        health: undefined,
        shield: undefined,
        armor: undefined,
        damage: undefined,
        critChance: undefined,
        critDamage: undefined,
        statusChance: undefined,
        polarities: undefined
    }
    public owned: boolean = false;


    /* LIFECYCLE */

    constructor(private navParams: NavParams, private storage: Storage)
    {
        for(var petAttribute in this.petObject)
        {
            this.petObject[petAttribute] = this.navParams.data[petAttribute];
        }
        
        this.storage.get("pet-" + this.petObject.name + "-owned").then((isOwned: boolean) => {
            this.owned = isOwned;
        });
    }

    public onOwnedClicked() : void
    {
        this.storage.set("pet-" + this.petObject.name + "-owned", this.owned);
    }


    /* METHODS */

    public unsafeIsArray(arg: any) : boolean
    {
        return arg.constructor == Array;
    }
    
};