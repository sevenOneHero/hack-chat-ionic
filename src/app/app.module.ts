import { ThemeSelectPage } from './../pages/theme-select/theme-select';
import { SettingsProvider } from './../providers/settings/settings';
import { HackchatPageModule } from './../pages/hackchat/hackchat.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ThemeSelectPageModule } from '../pages/theme-select/theme-select.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HackchatPageModule,
    ThemeSelectPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SettingsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider
  ]
})
export class AppModule {}
