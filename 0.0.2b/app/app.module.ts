import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { File } from '@ionic-native/file';
// import { FileTransfer } from '@ionic-native/file-transfer';

import { WarframeApp } from './app.component';
import { AppStateProvider } from '../providers/app-state';
import { ComponentsModule } from '../components/components.module';

import { WikiPage } from '../pages/wiki/wiki';
import { InvasionsPage } from '../pages/worldstate/invasions/invasions';
import { CetusPage } from '../pages/worldstate/cetus/cetus';
import { VallisPage } from '../pages/worldstate/vallis/vallis';

import { WarframesInfoPage } from '../pages/wiki/info/info-warframe/info';
import { ModInfoPage } from '../pages/wiki/info/info-mod/info';
import { WeaponsGunInfoPage } from '../pages/wiki/info/info-weapon-gun/info';
import { WeaponsMeleeInfoPage } from '../pages/wiki/info/info-weapon-melee/info';
import { PetInfoPage } from '../pages/wiki/info/info-pets/info';
import { SentinelInfoPage } from '../pages/wiki/info/info-sentinels/info';

@NgModule({
    declarations: [
        WarframeApp,
        
        WikiPage,
        InvasionsPage,
        CetusPage,
        VallisPage,
        
        WarframesInfoPage,
        ModInfoPage,
        WeaponsGunInfoPage,
        WeaponsMeleeInfoPage,
        PetInfoPage,
        SentinelInfoPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(WarframeApp, {
            preloadModules: true
        }),
        IonicStorageModule.forRoot(),
        ComponentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        WarframeApp,

        WikiPage,
        InvasionsPage,
        CetusPage,
        VallisPage,
        
        WarframesInfoPage,
        ModInfoPage,
        WeaponsGunInfoPage,
        WeaponsMeleeInfoPage,
        PetInfoPage,
        SentinelInfoPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        // File,
        // FileTransfer,
        AppStateProvider
    ]
})
export class AppModule {}