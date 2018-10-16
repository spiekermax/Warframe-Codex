import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-warframes-info',
    templateUrl: 'info.html'
})
export class WarframesInfoPage
{
    name: string;
    img: string;
    health: string;
    shield: string;
    armor: string;
    energy: string;
    speed: string;
    polarities: string;
    aurapol: string;
    abl1: string;
    abl2: string;
    abl3: string;
    abl4: string;
    abl1Info: string;
    abl2Info: string;
    abl3Info: string;
    abl4Info: string;
    quote: string;
    acquisition: string;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.name = navParams.data.name;
        this.img = navParams.data.img;
        this.health = navParams.data.health;
        this.shield = navParams.data.shield;
        this.armor = navParams.data.armor;
        this.energy = navParams.data.energy;
        this.speed = navParams.data.speed;
        this.polarities = navParams.data.polarities;
        this.aurapol = navParams.data.aurapol;
        this.abl1 = navParams.data.abl1;
        this.abl2 = navParams.data.abl2;
        this.abl3 = navParams.data.abl3;
        this.abl4 = navParams.data.abl4;
        this.abl1Info = navParams.data.abl1Info;
        this.abl2Info = navParams.data.abl2Info;
        this.abl3Info = navParams.data.abl3Info;
        this.abl4Info = navParams.data.abl4Info;
        this.quote = navParams.data.quote;
    }
};