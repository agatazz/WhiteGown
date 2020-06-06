import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DressesPage } from './dresses.page';
import { DressesRoutingModule } from './dresses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DressesRoutingModule
  ],
  declarations: [DressesPage]
})
export class DressesPageModule {}
