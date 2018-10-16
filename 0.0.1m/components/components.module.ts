import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from 'ionic-angular';

import { AlertStateComponent } from './alertstate/alertstate';
import { ItemGridFramedComponent } from './itemgrid-framed/itemgrid-framed';
import { ItemGridDarkComponent } from './itemgrid-dark/itemgrid-dark';
import { ItemGridPureComponent } from './itemgrid-pure/itemgrid-pure';

@NgModule({
	declarations: [
        AlertStateComponent,
        ItemGridFramedComponent,
        ItemGridDarkComponent,
        ItemGridPureComponent
    ],
	imports: [
        HttpClientModule,
        IonicModule
    ],
	exports: [
        AlertStateComponent,
        ItemGridFramedComponent,
        ItemGridDarkComponent,
        ItemGridPureComponent
    ]
})
export class ComponentsModule {}