import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WarframeApp } from './app.component';
import { AppConfigsProvider } from '../providers/app-configs/app-configs';
import { ComponentsModule } from '../components/components.module';

import { WikiPage } from '../pages/wiki/wiki';
import { AlertsPage } from '../pages/alerts/alerts';

import { WarframesInfoPage } from '../pages/wiki/info-warframe/info';
import { WeaponsGunInfoPage } from '../pages/wiki/info-weapon-gun/info';
import { WeaponsMeleeInfoPage } from '../pages/wiki/info-weapon-melee/info';
import { PetInfoPage } from '../pages/wiki/info-pets/info';
import { SentinelInfoPage } from '../pages/wiki/info-sentinels/info';

@NgModule({
  declarations: [
    WarframeApp,

    WikiPage,
    AlertsPage,

    WarframesInfoPage,
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
    AlertsPage,
    
    WarframesInfoPage,
    WeaponsGunInfoPage,
    WeaponsMeleeInfoPage,
    PetInfoPage,
    SentinelInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfigsProvider
  ]
})
export class AppModule {}