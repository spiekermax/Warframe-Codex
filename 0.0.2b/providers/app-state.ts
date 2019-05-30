import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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


@Injectable()
export class AppStateProvider
{
    /* ATTRIBUTES */

    private notificationState: any = {
        disclaimerEnabled: StateIdentifier.UNDEFINED,
        patchnotesEnabled: StateIdentifier.UNDEFINED
    }

    private userState: any = {
        platform: StateIdentifier.UNDEFINED
    }

    private wikiState: any = {
        title: "Warframes",
        activeSections: [ WikiPageIdentifier.WARFRAMES ],
        fallbackSections: [ WikiPageIdentifier.WARFRAMES ],
        itemFilter: "",
        itemMask: () => { return true }
    }


    /* LIFECYCLE */
    
    constructor(private storage: Storage)
    {
        this.storage.get("notificationState.disclaimerEnabled").then((value) => {
            this.notificationState.disclaimerEnabled = value;
        });
        this.storage.get("notificationState.patchnotesEnabled.rotB").then((value) => {
            this.notificationState.patchnotesEnabled = value;
        });
        this.storage.get("userState.platform").then((value) => {
            this.userState.platform = value;
        });
        
        // Update patchnote rotation
        this.storage.set("notificationState.patchnotesEnabled.rotA", 1);
    }


    /* METHODS */

    public doWikiSectionFallback() : void
    {
        this.wikiState.activeSections = this.wikiState.fallbackSections;
    }


    /* GETTERS & SETTERS */

    public async isDisclaimerEnabled() : Promise<StateIdentifier>
    {
        if(this.notificationState.disclaimerEnabled != StateIdentifier.UNDEFINED) return Promise.resolve(this.notificationState.disclaimerEnabled);

        return this.storage.get("notificationState.disclaimerEnabled");
    }

    public setDisclaimerEnabled(value: StateIdentifier) : void
    {
        this.notificationState.disclaimerEnabled = value;
        this.storage.set("notificationState.disclaimerEnabled", value);
    }

    public async arePatchnotesEnabled() : Promise<StateIdentifier>
    {
        if(this.notificationState.patchnotesEnabled != StateIdentifier.UNDEFINED) return Promise.resolve(this.notificationState.patchnotesEnabled);

        return this.storage.get("notificationState.patchnotesEnabled.rotB");
    }

    public setPatchnotesEnabled(value: StateIdentifier) : void
    {
        this.notificationState.patchnotesEnabled = value;
        this.storage.set("notificationState.patchnotesEnabled.rotB", value);
    }

    public async getUserPlatform() : Promise<string>
    {
        if(this.userState.platform != StateIdentifier.UNDEFINED) return Promise.resolve(this.userState.platform);

        return "pc"; // default-value
    }

    public setUserPlatform(value: string | number) : void
    {
        this.userState.platform = value;
        this.storage.set("userState.platform", value);
    }

    public getWikiTitle() : string
    {
        return this.wikiState.title;
    }

    public setWikiTitle(newTitle: string) : void
    {
        this.wikiState.title = newTitle;
    }

    public getWikiActiveSections() : Array<WikiPageIdentifier>
    {
        return this.wikiState.activeSections;
    }

    public setWikiActiveSections(newActiveSections: Array<WikiPageIdentifier>) : void
    {
        this.wikiState.activeSections = newActiveSections;
    }

    public getWikiFallbackSections() : Array<WikiPageIdentifier>
    {
        return this.wikiState.fallbackSections;
    }

    public setWikiFallbackSections(newFallbackSections: Array<WikiPageIdentifier>) : void
    {
        this.wikiState.fallbackSections = newFallbackSections;
    }

    public getWikiItemFilter() : string
    {
        return this.wikiState.itemFilter;
    }

    public setWikiItemFilter(newItemFilter: string) : void
    {
        this.wikiState.itemFilter = newItemFilter;
    }

    public getWikiItemMask() : Function
    {
        return this.wikiState.itemMask;
    }

    public setWikiItemMask(newItemMask: Function) : void
    {
        this.wikiState.itemMask = newItemMask;
    }

}