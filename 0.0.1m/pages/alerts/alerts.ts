import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppConfigsProvider } from '../../providers/app-configs/app-configs';

@Component({
    selector: 'page-alerts',
    templateUrl: 'alerts.html'
})
export class AlertsPage
{
    @ViewChild("alertsPC") alertsPC;
    @ViewChild("alertsXB1") alertsXB1;
    @ViewChild("alertsPS4") alertsPS4;
    alertsPlatform: string = "pc";

    constructor(public navCtrl: NavController, public appConfigs: AppConfigsProvider)
    {
        appConfigs.getAlertsPlatform((val) =>
        {
            if (!val) return; 
            this.alertsPlatform = val;
        });
    }

    refreshAlerts(refresher)
    {
        switch (this.alertsPlatform)
        {
            case "pc":
                this.alertsPC.pullAlerts(()=>{
                    refresher.complete();
                });    
            break;
            case "xb1":
                this.alertsXB1.pullAlerts(()=>{
                    refresher.complete();
                }); 
            break;
            case "ps4":
                this.alertsPS4.pullAlerts(()=>{
                    refresher.complete();
                }); 
            break;
            default: break;
        }
    }
};