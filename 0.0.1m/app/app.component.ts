import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { AppConfigsProvider } from '../providers/app-configs/app-configs';

import { AlertsPage } from '../pages/alerts/alerts';
import { WikiPage } from '../pages/wiki/wiki';

@Component({
    templateUrl: 'app.html'
})
export class WarframeApp
{
    @ViewChild(Nav) nav: Nav;
    pageAlerts = AlertsPage;
    pageWiki = WikiPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController, public appConfigs: AppConfigsProvider)
    {
        this.onInit();
    }

    onInit()
    {
        this.platform.ready().then(() =>
        {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.showDisclaimer();
        });
    }

    onSidemenuClosed()
    {
        let targets: any = document.getElementsByClassName("sidemenu-submenu");
        for(let i = 0; i < targets.length; ++i)
        {
            targets[i].style.height = "0";
            targets[i].setAttribute("extended", "false");
        }
    }

    openPage(page)
    {
        this.nav.setRoot(page);
    }

    openWikiPage(wikiPage, wikiTitle)
    {
        this.appConfigs.setWikiTitle(wikiTitle);
        this.appConfigs.setWikiSectionFilter([wikiPage]);
        this.appConfigs.setWikiFallbackSection([wikiPage]);

        if(this.nav.getActive().component != WikiPage)
        {
            this.nav.setRoot(WikiPage);
        }
        else
        {
            this.nav.getActive().getContent().scrollToTop(0);
        }
    }

    showAlert(title, msg)
    {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }

    showDisclaimer()
    {
        this.appConfigs.getDisclaimerEnabled((isEnabled) =>
        {
            if(isEnabled == false)
            {
                this.showPatchNotes();
                return;
            }

            let alert = this.alertCtrl.create({
                title: "Disclaimer",
                message: "Digital Extreme Ltd, Warframe and the logo Warframe are registered trademarks. All rights are reserved worldwide. This app has no official link with Digital Extremes Ltd or Warframe. All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of Digital Extreme Ltd.",
                buttons: ['I understand'],
                cssClass: "alert-disclaimer"
            });
            alert.addInput({
                type: "checkbox",
                label: "Don't show this again",
                handler: (evt) => {
                    this.appConfigs.setDisclaimerEnabled(!evt.checked);
                }
            });
            alert.onDidDismiss(() => {this.showPatchNotes()});
            
            alert.present();
        });
    }

    showPatchNotes()
    {
        this.appConfigs.getPatchNotesShown((wasShown) =>
        {
            if (wasShown == true) return;

            let alert = this.alertCtrl.create({
                title: "Patchnotes",
                message: `
                <h6>New features:</h6>
                <ul>
                    <li>Added 'Primed Warframes' and 'Umbra Warframes'</li>
                    <li>Your alert platform preference is now saved</li>
                    <li>Added Animations to the search feature</li>
                    <li>Added 'Patchnotes'</li>
                    <li>Improved the quality of 'Polarity Icons'</li>
                </ul>
                <h6>WIP:</h6>
                <ul>
                    <li>'Primed Weapons' & 'Primed Sentinels'</li>
                    <li>Mod acquisition info</li>
                    <li>Choose what to download for offline</li>
                    <li>Langauge Packs</li>
                </ul>`,
                buttons: ['Nice!'],
                cssClass: "alert-patchnotes"
            });

            alert.present();
            this.appConfigs.setPatchNotesShown(true);
        });
    }

    toggleSubmenu(id)
    {
        let target = document.getElementById(id);
        if(target.getAttribute("extended") == "false")
        {
            target.style.height = target.getAttribute("content-height");
            target.setAttribute("extended", "true");
        }
        else if (target.getAttribute("extended") == "true")
        {
            target.style.height = "0";
            target.setAttribute("extended", "false");
        }
    }   
};