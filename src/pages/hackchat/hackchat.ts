import { SettingsProvider } from './../../providers/settings/settings';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

/**
 * Generated class for the HackchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hackchat',
  templateUrl: 'hackchat.html',
  providers: [ SettingsProvider ]
})
export class HackchatPage {
  predefinedChannels = ['lounge',
  'meta',
  'math', 'physics', 'chemistry'
  ,'technology' ,'programming'
  ,'games', 'banana'];
  

  selectedTheme: String = 'default';

  constructor(private events: Events, private settings: SettingsProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    
  }


  toggleTheme() {
    this.events.publish('theme');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HackchatPage');
  }

  onChannelSelected(channel)
  {
    this.navCtrl.push(HomePage, {
      channel: channel
    });
  }

  startChannel() {
    
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New Channel',
      inputs: [
        {
          name: 'Channel',
          placeholder: 'Channel Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.onChannelSelected(data.Channel);
            
          }
        }
      ]
    });
    prompt.present();
  }
}
