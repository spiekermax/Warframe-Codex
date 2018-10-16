import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-pet-info',
    templateUrl: 'info.html'
})
export class PetInfoPage
{
    name: string;
    img: string;
    health: string;
    shield: string;
    armor: string;
    power: string;
    damage: string;
    crit: string;
    critdmg: string;
    status: string;
    polarities: string;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.name = navParams.data.name;
        this.img = navParams.data.img;
        this.health = navParams.data.health;
        this.shield = navParams.data.shield;
        this.armor = navParams.data.armor;
        this.power = navParams.data.power;
        this.damage = navParams.data.damage;
        this.crit = navParams.data.crit;
        this.critdmg = navParams.data.critdmg;
        this.status = navParams.data.status;
        this.polarities = navParams.data.polarities;
    }
};