import { SettingsProvider } from './../providers/settings/settings';
import { HackchatPage } from './../pages/hackchat/hackchat';
import { Component} from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ThemeSelectPage } from '../pages/theme-select/theme-select';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HackchatPage;
  selectedTheme: String = 'default';
  constructor(public popoverCtrl: PopoverController, public events: Events, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  private settings: SettingsProvider) {
   
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    events.subscribe('theme', (themename) => {
      this.presentPopover();
    });

    events.subscribe('changetheme', (themename) => {
      this.settings.setActiveTheme(themename);
    });
  }

  changeTheme(theme: string) {
    console.log('toggling theme' + theme);
    this.settings.setActiveTheme(theme);  
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(ThemeSelectPage);
    popover.present();
  }
}

