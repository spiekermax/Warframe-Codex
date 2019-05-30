import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-weapons-melee-info',
    templateUrl: 'info.html'
})
export class WeaponsMeleeInfoPage
{
    /* ATTRIBUTES */

    public weaponObject =
    {
        id: undefined,
        name: undefined,
        img: undefined,
        mastery: undefined,
        blockResist: undefined,
        stancePolarity: undefined,
        finisherDamage: undefined,
        attacks: undefined,
        polarities: undefined
    }
    public owned: boolean = false;


    /* LIFECYCLE */

    constructor(private navParams: NavParams, private storage: Storage)
    {
        for(var weaponAttribute in this.weaponObject)
        {
            this.weaponObject[weaponAttribute] = this.navParams.data[weaponAttribute];
        }

        this.storage.get("weapon-melee-" + this.weaponObject.name + "-owned").then((isOwned: boolean) => {
            this.owned = isOwned;
        });
    }

    public onOwnedClicked() : void
    {
        this.storage.set("weapon-melee-" + this.weaponObject.name + "-owned", this.owned);
    }


    /* METHODS */

    public keysOf(obj: Object) : string[]
    {
        return Object.keys(obj);
    }

    public unsafeIsObject(arg: any) : boolean
    {
        return arg.constructor == Object;
    }

    public isDeltaArray(arg: any) : boolean
    {
        if(!Array.isArray(arg)) return false;

        const lastElement = arg[arg.length - 1];
        return (lastElement == "+" || lastElement == "m" || lastElement == "-");
    }
    
};