import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppConfigsProvider
{
    disclaimerEnabled: boolean;
    patchNotesShown: boolean;
    alertsPlatform: string;
    wikiInitialSection: string = "Warframes";
    wikiTitle: string = this.wikiInitialSection;
    wikiFallbackSection: Array<string> = [this.wikiInitialSection];
    wikiSectionFilter: Array<string> = [this.wikiInitialSection];
    
    constructor(public http: HttpClient, public storage: Storage)
    {
        this.storage.get("disclaimerEnabled").then((val) =>
        {
            this.disclaimerEnabled = val;
        });
        this.storage.get("patchNotesShown").then((val) =>
        {
            this.disclaimerEnabled = val;
        });
        this.storage.get("alertsPlatform").then((val) =>
        {
            this.alertsPlatform = val;
        });
    }

    wikiSectionFallback()
    {
        this.wikiSectionFilter = this.wikiFallbackSection;
    }

    getDisclaimerEnabled(callback: Function)
    {
        if(this.disclaimerEnabled)
        {
            callback(this.disclaimerEnabled);
        }
        else
        {
            this.storage.get("disclaimerEnabled").then((val) =>
            {
                callback(val);
            });
        }
    }

    setDisclaimerEnabled(val: boolean)
    {
        this.disclaimerEnabled = val;
        this.storage.set("disclaimerEnabled", this.disclaimerEnabled);
    }

    getPatchNotesShown(callback: Function)
    {
        if(this.patchNotesShown)
        {
            callback(this.patchNotesShown);
        }
        else
        {
            this.storage.get("patchNotesShown").then((val) =>
            {
                callback(val);
            });
        }
    }

    setPatchNotesShown(val: boolean)
    {
        this.patchNotesShown = val;
        this.storage.set("patchNotesShown", this.patchNotesShown);
    }

    getAlertsPlatform(callback: Function)
    {
        if(this.alertsPlatform)
        {
            callback(this.alertsPlatform);
        }
        else
        {
            this.storage.get("alertsPlatform").then((val) =>
            {
                callback(val);
            });
        }
    }

    setAlertsPlatform(val: string)
    {
        this.alertsPlatform = val;
        this.storage.set("alertsPlatform", this.alertsPlatform);
    }

    getWikiTitle()
    {
        return this.wikiTitle;
    }

    setWikiTitle(newTitle: string)
    {
        this.wikiTitle = newTitle;
    }

    getWikiFallbackSection()
    {
        return this.wikiFallbackSection;
    }

    setWikiFallbackSection(newFallbackSection: Array<string>)
    {
        this.wikiFallbackSection = newFallbackSection;
    }

    getWikiSectionFilter()
    {
        return this.wikiSectionFilter;
    }

    setWikiSectionFilter(newSectionFilter: Array<string>)
    {
        this.wikiSectionFilter = newSectionFilter;
    }
}
