import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperadminPage } from './superadmin';

@NgModule({
  declarations: [
    SuperadminPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperadminPage),
  ],
  exports: [
    SuperadminPage
  ]
})
export class SuperadminPageModule {}
