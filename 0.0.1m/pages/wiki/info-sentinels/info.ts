import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-sentinel-info',
    templateUrl: 'info.html'
})
export class SentinelInfoPage
{
    name: string;
    img: string;
    health: string;
    shield: string;
    armor: string;
    power: string;
    polarities: string;

    wpname: string;
    noiselvl: string;
    firerate: string;
    accuracy: string;
    magsize: string;
    reload: string;
    damage: string;
    crit: string;
    critdmg: string;
    status: string;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.name = navParams.data.name;
        this.img = navParams.data.img;
        this.health = navParams.data.health;
        this.shield = navParams.data.shield;
        this.armor = navParams.data.armor;
        this.power = navParams.data.power;
        this.polarities = navParams.data.polarities;

        this.wpname = navParams.data.wpname;
        this.noiselvl = navParams.data.noiselvl;
        this.firerate = navParams.data.firerate;
        this.accuracy = navParams.data.accuracy;
        this.magsize = navParams.data.magsize;
        this.reload = navParams.data.reload;
        this.damage = navParams.data.damage;
        this.crit = navParams.data.crit;
        this.critdmg = navParams.data.critdmg;
        this.status = navParams.data.status;
    }
};