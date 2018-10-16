import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavController, NavParams, Platform, AlertController, Content } from 'ionic-angular';

import { AppConfigsProvider } from '../../providers/app-configs/app-configs';

import { WarframesInfoPage } from './info-warframe/info';
import { WeaponsGunInfoPage } from './info-weapon-gun/info';
import { WeaponsMeleeInfoPage } from './info-weapon-melee/info';
import { PetInfoPage } from './info-pets/info';
import { SentinelInfoPage } from './info-sentinels/info';

@Component({
    selector: 'page-wiki',
    templateUrl: 'wiki.html',
    animations: [
        trigger(
            'fadeAnimation',
            [transition(':enter', [
                style({position: 'absolute', opacity: 0}),
                animate('200ms', style({position: 'absolute', opacity: 1}))
            ]),
            transition(':leave', [
                style({position: 'absolute', opacity: 1}),
                animate('200ms', style({position: 'absolute', opacity: 0})),
            ])]
        )
    ],
})
export class WikiPage
{
    @ViewChild(Content) content: Content;
    @ViewChild("searchbar") searchbar;
    displayMode: string = "wiki";
    itemFilter: string = "";
    animationsEnabled: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public appConfigs: AppConfigsProvider)
    {
        platform.ready().then(() =>
        {
            platform.registerBackButtonAction(() =>
            {
                if(this.navCtrl.getActive().component == WikiPage)
                {
                    this.onSearchbarBackButtonAction();
                }
                else
                {
                    this.navCtrl.pop();
                }
            });
        });
    }

    ngAfterViewInit()
    {
        this.animationsEnabled = true;
    }
  
    openSearchbar()
    {
        this.displayMode = "search";
        setTimeout(() => {
            this.searchbar.setFocus();
        }, 15);
    }

    updateItemFilter(evt)
    {
        this.itemFilter = evt.target.value;
    }

    onSearchbarFocus()
    {
        this.content.scrollToTop();
    }

    onSearchbarBackButtonAction()
    {
        if(this.displayMode == "wiki") return;

        this.appConfigs.wikiSectionFallback();
        this.content.scrollToTop();
        this.displayMode = "wiki";
        this.itemFilter = "";
    }

    openFilterTool()
    {
        let alert = this.alertCtrl.create();
        alert.setTitle("Categories");

        let inputs = [
            {label: "Warframes", value: "Warframes"},
            {label: "Companions", value: "Companions"},
            {label: "Weapons", value: ["Primary Weapons", "Secondary Weapons", "Melee Weapons"]},
            {label: "Mods", value: ["Archwing Mods", "Companion Mods", "Warframe Mods", "Weapon Mods"]}
        ];
        for(let i = 0; i < inputs.length; ++i)
        {
            alert.addInput({
                type: "checkbox",
                label: inputs[i].label,
                value: <string>inputs[i].value,
                checked: inputs[i].value == this.appConfigs.getWikiSectionFilter()
            });
        }
        
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: (data) => {
              this.appConfigs.setWikiSectionFilter(data.flat());
              this.content.scrollToTop();
            }
        });
        alert.present();
    }

    openWarframeInfo(warframe)
    {
        this.navCtrl.push(WarframesInfoPage, warframe);
    }

    openGunInfo(gun)
    {
        this.navCtrl.push(WeaponsGunInfoPage, gun);
    }

    openMeleeInfo(melee)
    {
        this.navCtrl.push(WeaponsMeleeInfoPage, melee);
    }

    openPetInfo(pet)
    {
        this.navCtrl.push(PetInfoPage, pet);
    }

    openSentinelInfo(sentinel)
    {
        this.navCtrl.push(SentinelInfoPage, sentinel);
    }
};