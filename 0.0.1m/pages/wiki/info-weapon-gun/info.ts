import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-weapons-gun-info',
    templateUrl: 'info.html'
})
export class WeaponsGunInfoPage
{
    name: string;
    img: string;
    noiselvl: string;
    firerate: string;
    accuracy: string;
    magsize: string;
    ammo: string;
    reload: string;
    damage: string;
    crit: string;
    critdmg: string;
    status: string;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.name = navParams.data.name;
        this.img = navParams.data.img;
        this.noiselvl = navParams.data.noiselvl;
        this.firerate = navParams.data.firerate;
        this.accuracy = navParams.data.accuracy;
        this.magsize = navParams.data.magsize;
        this.ammo = navParams.data.ammo;
        this.reload = navParams.data.reload;
        this.damage = navParams.data.damage;
        this.crit = navParams.data.crit;
        this.critdmg = navParams.data.critdmg;
        this.status = navParams.data.status;
    }
};