import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins, Capacitor } from '@capacitor/core';
import { AuthService } from './auth/auth.service';
import { Subscription, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private authSub: Subscription;
  private prevAuthState = false;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if( Capacitor.isPluginAvailable('SplaschScreen') ) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.prevAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.prevAuthState = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
    //this.router.navigateByUrl('/auth');
  }

  ngOnDestroy() {
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }
}
