import { SettingsProvider } from './../../providers/settings/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

/**
 * Generated class for the ThemeSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-theme-select',
  templateUrl: 'theme-select.html',
})
export class ThemeSelectPage {

  mThemes = ['dark', 'light', 'red', 'blue', 'wheat', 'crimsonred', 'gray', 'twitter'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,private settings: SettingsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeSelectPage');
  }

  selectTheme(theme: string) {
    this.events.publish('changetheme', theme);    
  }
}
