import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavController, Platform, AlertController, Content } from 'ionic-angular';

import { AppStateProvider } from '../../providers/app-state';

import { WarframesInfoPage } from './info/info-warframe/info';
import { ModInfoPage } from './info/info-mod/info';
import { WeaponsGunInfoPage } from './info/info-weapon-gun/info';
import { WeaponsMeleeInfoPage } from './info/info-weapon-melee/info';
import { PetInfoPage } from './info/info-pets/info';
import { SentinelInfoPage } from './info/info-sentinels/info';

enum DisplayModeIdentifier
{
    WIKI,  // 0
    SEARCH // 1
}
enum WikiPageIdentifier
{
    WARFRAMES,         // 0
    COMPANIONS,        // 1
    PRIMARY_WEAPONS,   // 2
    SECONDARY_WEAPONS, // 3
    MELEE_WEAPONS,     // 4
    ARCHWING_MODS,     // 5
    COMPANION_MODS,    // 6
    WARFRAME_MODS,     // 7
    WEAPON_MODS        // 8
}


@Component({
    selector: "page-wiki",
    templateUrl: "wiki.html",
    animations: [
        trigger(
            "fadeAnimation", [
                transition(":enter", [
                    style({ position: "absolute", opacity: 0 }),
                    animate("200ms", style({ position: "absolute", opacity: 1 }))
                ]),
                transition(":leave", [
                    style({ position: "absolute", opacity: 1 }),
                    animate("200ms", style({ position: "absolute", opacity: 0 }))
                ])
            ]
        )
    ],
})
export class WikiPage implements AfterViewInit, OnDestroy
{
    /* ATTRIBUTES */

    /**
     * The content component of this page.
     */
    @ViewChild(Content) public content: Content;

    /**
     * The searchbar component of this page.
     */
    @ViewChild("searchbar") public searchbar: any;

    /**
     * The current display mode of this page, used to switch between navbars.
     */
    public displayMode: DisplayModeIdentifier = DisplayModeIdentifier.WIKI;

    /**
     * Controls wether angular animations are enabled for this page.
     */
    public animationsEnabled: boolean = false;

    /**
     * Controls which wiki sub-pages to preload.
     */
    public preloadChunksEnabled: number = -1;


    /* LIFECYCLE */

    /**
     * Called once the app's scripts are being initialized.
     */
    constructor(private navCtrl: NavController, private platform: Platform, private alertCtrl: AlertController, public appState: AppStateProvider)
    {
        // Called once platform actions can be performed.        
        this.platform.ready().then(() =>
        {
            // Overwrite global backbutton behavior.
            this.platform.registerBackButtonAction(() => 
            {
                // Wiki page behavior:
                if(this.navCtrl.getActive().component == WikiPage)
                {
                    this.onWikiBackButtonAction();
                }
                // Other page behavior:
                else
                {
                    // Pops an info page if one is displayed.
                    this.navCtrl.pop();
                }
            });
        });
    }

    /**
     * Called after this page's DOM is fully loaded.
     */
    public ngAfterViewInit() : void
    {
        // Enable local angular animations.
        this.animationsEnabled = true;

        // Load hidden wiki pages chunkwise.
        for(var i = 0; i < 9; ++i)
        {
            setTimeout(() => {
                ++this.preloadChunksEnabled;
            }, (i + 2) * 250);
        }
    }

    /**
     * Called once this page is about to be destroyed.
     */
    public ngOnDestroy() : void
    {
        // Reset any applied item filters since they are not overwritten automatically (unlike item masks).
        this.appState.setWikiItemFilter("");
    }


    /* METHODS */
  
    /**
     * Switches between navbars to show the searchbar.
     */
    public openSearchbar() : void
    {
        this.displayMode = DisplayModeIdentifier.SEARCH;
        setTimeout(() => {
            this.searchbar.setFocus();
        }, 15);
    }

    /**
     * Called everytime the search query changes.
     * Updates the item filter.
     * @param evt The 'onInput' event data.
     */
    public updateItemFilter(evt: any) : void
    {
        this.appState.setWikiItemFilter(evt.target.value);
    }

    /**
     * Called everytime a backbutton action is performed on the wiki page.
     */
    public onWikiBackButtonAction() : void
    {
        // Display mode: Wiki
        if(this.displayMode == DisplayModeIdentifier.WIKI)
        {
            this.content.scrollToTop();
            return;
        }

        // Display mode: Search
        this.appState.doWikiSectionFallback();
        this.content.scrollToTop();
        this.displayMode = DisplayModeIdentifier.WIKI;
        this.appState.setWikiItemFilter("");
    }

    /**
     * Opens the filter tool, used to select the user's target search categories.
     */
    public openFilterTool() : void
    {
        const alert = this.alertCtrl.create({ title: "Categories" });
        const inputs = [
            { label: "Warframes", value: WikiPageIdentifier.WARFRAMES },
            { label: "Companions", value: WikiPageIdentifier.COMPANIONS },
            { label: "Weapons", value: [ WikiPageIdentifier.PRIMARY_WEAPONS, WikiPageIdentifier.SECONDARY_WEAPONS, WikiPageIdentifier.MELEE_WEAPONS ] },
            { label: "Mods", value: [ WikiPageIdentifier.ARCHWING_MODS, WikiPageIdentifier.COMPANION_MODS, WikiPageIdentifier.WARFRAME_MODS, WikiPageIdentifier.WEAPON_MODS ] }
        ];
        for(var i = 0; i < inputs.length; ++i)
        {
            alert.addInput({
                type: "checkbox",
                label: inputs[i].label,
                value: <any>inputs[i].value,
            });
        }
        alert.addButton("Cancel");
        alert.addButton({
            text: "Okay",
            handler: (data) => {
                this.appState.setWikiActiveSections(data.flat());
                this.content.scrollToTop();
            }
        });

        alert.present();
    }

    /**
     * Opens the warframe info page.
     * @param warframe The JSON data for the target warframe.
     */
    public openWarframeInfo(warframe: any) : void
    {
        this.navCtrl.push(WarframesInfoPage, warframe);
    }

    /**
     * Opens the pet info page.
     * @param warframe The JSON data for the target pet.
     */
    public openPetInfo(pet: any) : void
    {
        this.navCtrl.push(PetInfoPage, pet);
    }

    /**
     * Opens the sentinel info page.
     * @param warframe The JSON data for the target sentinel.
     */
    public openSentinelInfo(sentinel: any) : void
    {
        this.navCtrl.push(SentinelInfoPage, sentinel);
    }

    /**
     * Opens the gun info page.
     * @param warframe The JSON data for the target gun.
     */
    public openGunInfo(gun: any) : void
    {
        this.navCtrl.push(WeaponsGunInfoPage, gun);
    }

    /**
     * Opens the melee info page.
     * @param warframe The JSON data for the target melee weapon.
     */
    public openMeleeInfo(melee: any) : void
    {
        this.navCtrl.push(WeaponsMeleeInfoPage, melee);
    }

    /**
     * Opens the mod info page.
     * @param warframe The JSON data for the target mod.
     */
    public openModInfo(mod: any) : void
    {
        this.navCtrl.push(ModInfoPage, mod);
    }
}