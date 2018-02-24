import { SettingsProvider } from './../../providers/settings/settings';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HackchatPage } from './hackchat';

@NgModule({
  declarations: [
    HackchatPage,
  ],
  imports: [
    IonicPageModule.forChild(HackchatPage),
  ],
  providers: [ SettingsProvider ]
})
export class HackchatPageModule {}
