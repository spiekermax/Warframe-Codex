import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppStateProvider } from '../providers/app-state';

import { WikiPage } from '../pages/wiki/wiki';
import { InvasionsPage } from '../pages/worldstate/invasions/invasions';
import { CetusPage } from '../pages/worldstate/cetus/cetus';
import { VallisPage } from '../pages/worldstate/vallis/vallis';

/**
 * All wiki subpages with corresponding identifier.
 */
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

/**
 * All states with corresponding identifier.
 */
enum StateIdentifier
{
    UNDEFINED = -1, // never set before
    FALSE = 0,      // not enabled
    TRUE = 1        // enabled
}


@Component({
    selector: 'page-app',
    templateUrl: 'app.html'
})
export class WarframeApp
{
    /* ATTRIBUTES */

    /**
     * The navigation component, used to switch between pages.
     */
    @ViewChild(Nav) private navigation: Nav;

    /**
     * The primary pages of the application.
     */
    public pages: any = 
    {
        wiki: WikiPage,
        invasions: InvasionsPage,
        cetus: CetusPage,
        vallis: VallisPage
    }

    /**
     * The item mask used to display 'Prime' objects only.
     */
    public primeItemMask: Function = (item) => { return item.name.includes("Prime") && item.name != "Primed Chamber" }


    /* LIFECYCLE */

    /**
     * Called once the app's scripts are being initialized.
     */
    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private alertCtrl: AlertController, private appState: AppStateProvider)
    {
        // Called once platform actions can be performed.
        this.platform.ready().then(() =>
        {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.queueStartupAlerts();
        });
    }


    /* METHODS */

    /**
     * Navigates to the given page.
     * @param page The page to display.
     */
    public openPage(page: any) : void
    {
        this.navigation.setRoot(page);
    }

    /**
     * Navigates to the specified wiki page.
     * @param sections The wiki sections to display.
     * @param title The title to display.
     * @param itemMask The item mask to apply to the displayed wiki objects.
     */
    public openWikiPage(title: string, sections: Array<WikiPageIdentifier>, itemMask: Function = () => { return true }) : void
    {
        this.appState.setWikiTitle(title);
        this.appState.setWikiActiveSections(sections);
        this.appState.setWikiItemMask(itemMask);
        this.appState.setWikiFallbackSections(sections);

        const activePage = this.navigation.getActive();
        if(activePage.component != this.pages.wiki)
        {
            this.navigation.setRoot(this.pages.wiki);
        }
        else
        {
            activePage.getContent().scrollToTop(0);
        }
    }

    /**
     * Queues the alerts to show when the app starts.
     */
    public queueStartupAlerts() : void
    {
        this.requestPatchnotesAlert( () => this.requestDisclaimerAlert() );
    }

    /**
     * Shows a disclaimer, regarding the Warframe trademark.
     */
    public requestDisclaimerAlert(onDismissed: Function = () => { }) : void
    {
        this.appState.isDisclaimerEnabled().then((isEnabled: StateIdentifier) =>
        {
            if(isEnabled == StateIdentifier.FALSE)
            {
                onDismissed();
                return;
            }

            let inputChecked: boolean = false;
            const alert: Alert = this.alertCtrl.create({
                title: "Disclaimer",
                message: `Digital Extreme Ltd, Warframe and the logo Warframe are registered trademarks. 
                    All rights are reserved worldwide. This app has no official link with Digital Extremes Ltd or Warframe. 
                    All artwork, screenshots, characters or other recognizable features of the intellectual property 
                    relating to these trademarks are likewise the intellectual property of Digital Extreme Ltd.`,
                buttons: ['I understand'],
                cssClass: "alert-disclaimer"
            });
            alert.addInput({
                type: "checkbox",
                label: "Don't show this again",
                handler: (evt) => { inputChecked = evt.checked }
            });
            alert.onDidDismiss(() => { 
                this.appState.setDisclaimerEnabled(inputChecked ? StateIdentifier.FALSE : StateIdentifier.TRUE);
                onDismissed();
            });

            alert.present();
        });
    }

    /**
     * Shows an alert, displaying the latest patchnotes of this app.
     */
    public requestPatchnotesAlert(onDismissed: Function = () => { }) : void
    {
        this.appState.arePatchnotesEnabled().then((areEnabled: StateIdentifier) =>
        {
            if(areEnabled == StateIdentifier.FALSE)
            {
                onDismissed();
                return;
            }

            const alert: Alert = this.alertCtrl.create({
                title: "Patch notes",
                message: `
                    <h5>New features</h5>
                    <ul>
                        <li>Added new augment mods</li>
                        <li>Added new weapons 'Unarmed' and 'Korrudo'</li>
                        <li>You can now donate on spiekermax.github.io</li>
                        <li>Fixed some bugs</li>
                    </ul>
                    <h5>WIP</h5>
                    <ul>
                        <li>Relics</li>
                        <li>More acquisition info</li>
                        <li>Warframe components</li>
                        <li>Choose what to download for offline</li>
                    </ul>`,
                buttons: ['Nice!'],
                cssClass: "alert-patchnotes"
            });
            alert.onDidDismiss(() => { onDismissed() });

            alert.present().then(() => {
                this.appState.setPatchnotesEnabled(StateIdentifier.FALSE);
            });
        });
    }
    
    /**
     * Shows an alert, informing the user about future giveaways.
     */
    public showGiveawayAlert() : void
    {
        const alert: Alert = this.alertCtrl.create({
            title: "Info",
            subTitle: "Free platinum giveaways coming soon!",
            buttons: ['OK']
        });
        alert.present();
    }

    /**
     * Toggles the visibility of a submenu in the sidemenu.
     * @param id The id of the submenu to toggle.
     */
    public toggleSubmenu(id) : void
    {
        const target: HTMLElement = document.getElementById(id);
        if(target.getAttribute("extended") == "false")
        {
            target.style.height = target.getAttribute("content-height");
            target.setAttribute("extended", "true");
        }
        else if(target.getAttribute("extended") == "true")
        {
            target.style.height = "0";
            target.setAttribute("extended", "false");
        }
    }   

    /**
     * Resets the visibility of all submenus in the sidemenu.
     */
    public onSidemenuClosed() : void
    {
        const targets: any = document.getElementsByClassName("sidemenu-submenu");
        for(var i = 0; i < targets.length; ++i)
        {
            targets[i].style.height = "0";
            targets[i].setAttribute("extended", "false");
        }
    }
    
}