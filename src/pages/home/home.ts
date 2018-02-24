import { Component, ViewChild } from '@angular/core';
import { NavController, Content, AlertController, NavParams, Events } from 'ionic-angular';
import { $WebSocket, WebSocketConfig } from 'angular2-websocket/angular2-websocket';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ SocialSharing , SettingsProvider]
})
export class HomePage {

  @ViewChild(Content) content: Content;
  
  mNick: string;
  selectedTheme: String;
  
  mChannel: string;
  inputMessage = '';
  ws: $WebSocket;
  websocketConfig: WebSocketConfig = {
    initialTimeout: 1000,
    maxTimeout: 1000,
    reconnectIfNotNormalClose: true
  }

  mFeed: Array<any> = [];
  constructor(public events: Events,private settings: SettingsProvider, private socialSharing: SocialSharing, public navCtrl: NavController, private alertCtrl: AlertController, private navParams: NavParams) {
    this.mChannel = this.navParams.get('channel');
    this.doPrompt();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    
    // this.pullAdmins(JSON.parse('{ "cmd": "TBotT", "text": "Site admin: baban, pana, manna, mangatram"}'))
  }

  invite() {
    this.socialSharing.share(this.mNick + ' invites you to join a chat on hackchat, download app ' + 'http://goo.gl/fGQFQN' +' and join the room \'' +  this.mChannel + '\' or click on following url https://hack.chat/?' + this.mChannel).then(
      () => {
        console.log('share then');
      }
    )
  }

  

  // pullAdmins(feedItem: any) {
    
  //   if(feedItem.nick == 'TBotT' && feedItem.text.('Site admin')) {
  //     console.log(feedItem.text.split(','));
  //   }
  // }

  toggleTheme() {
    this.events.publish('theme');
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
  }

  connect(nick: string) {
    console.log('connecting');
    // connect
    this.ws = new $WebSocket("wss://hack.chat/chat-ws", null, this.websocketConfig);
    // you can send immediately after connect, 
    // data will cached until connect open and immediately send or connect fail.

    // when connect fail, websocket will reconnect or not,
    // you can set {WebSocketConfig.reconnectIfNotNormalClose = true} to enable auto reconnect
    // all cached data will lost when connect close if not reconnect

    // set received message callback
    this.ws.onMessage(
      (msg: MessageEvent) => {
        console.log("onMessage ", msg.data);
        this.mFeed.push(JSON.parse(msg.data));
        this.scrollToBottom();
      },
      { autoApply: false }
    );


    this.ws.onClose(
      () =>
      {
        console.log('socket closed');
      }
    );

    this.ws.onError(
      () => {
        console.log('on error');
      }
    )

    this.ws.onOpen(
      (cb: any) => {
        console.log('on open ' + JSON.stringify(cb));
        this.joinChannel({cmd: 'join', channel: this.mChannel, nick: nick})
        
      }
    )

    // set received message stream
    this.ws.getDataStream().subscribe(
      (msg) => {
        // console.log("next", msg.data);
        // this.ws.close(false);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );


  }


  joinChannel(message: any) {
    // send with default send mode (now default send mode is Observer)
    this.ws.send(JSON.stringify(message)).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }

  addNickToMessage(nick: string) {
    this.inputMessage += '@' + nick + ' ';
  }

  sendMessage() {

    var sendMessage = this.inputMessage;
    this.inputMessage = '';
    console.log('sending message ' + sendMessage);
   
    this.ws.send({cmd: 'chat', text: sendMessage}).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }




  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: this.mChannel,
      inputs: [
        {
          name: 'Nickname',
          placeholder: 'Nickname'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.navCtrl.pop();
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.connect(data.Nickname);
            this.mNick = data.Nickname;
            console.log('Saved clicked'  + JSON.stringify(data));
          }
        }
      ]
    });
    prompt.present();
  }

}
