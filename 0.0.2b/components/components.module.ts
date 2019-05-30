import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from 'ionic-angular';

import { InvasionStateComponent } from './invasionstate/invasionstate';
import { CycleStateComponent } from './cyclestate/cyclestate';
import { ItemGridFramedComponent } from './itemgrid-framed/itemgrid-framed';
import { ItemGridDarkComponent } from './itemgrid-dark/itemgrid-dark';
import { ItemGridPureComponent } from './itemgrid-pure/itemgrid-pure';

@NgModule({
	declarations: [
        InvasionStateComponent,
        CycleStateComponent,
        ItemGridFramedComponent,
        ItemGridDarkComponent,
        ItemGridPureComponent
    ],
	imports: [
        HttpClientModule,
        IonicModule
    ],
	exports: [
        InvasionStateComponent,
        CycleStateComponent,
        ItemGridFramedComponent,
        ItemGridDarkComponent,
        ItemGridPureComponent
    ]
})
export class ComponentsModule {}