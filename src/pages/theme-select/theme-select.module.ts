import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThemeSelectPage } from './theme-select';

@NgModule({
  declarations: [
    ThemeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ThemeSelectPage),
  ],
})
export class ThemeSelectPageModule {}
