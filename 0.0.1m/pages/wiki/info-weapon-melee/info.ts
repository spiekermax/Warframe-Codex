import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-weapons-melee-info',
    templateUrl: 'info.html'
})
export class WeaponsMeleeInfoPage
{
    name: string;
    img: string;
    atkspeed: string;
    blockred: string;
    damage: string;
    crit: string;
    critdmg: string;
    status: string;
    slam: string;
    slide: string;
    wall: string;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.name = navParams.data.name;
        this.img = navParams.data.img;
        this.atkspeed = navParams.data.atkspeed;
        this.blockred = navParams.data.blockred;
        this.damage = navParams.data.damage;
        this.crit = navParams.data.crit;
        this.critdmg = navParams.data.critdmg;
        this.status = navParams.data.status;
        this.slam = navParams.data.slam;
        this.slide = navParams.data.slide;
        this.wall = navParams.data.wall;
    }
};