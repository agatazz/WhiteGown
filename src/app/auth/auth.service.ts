import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core"
import { User } from "./user.model";



export interface AuthInterface{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy{
  private _user = new BehaviorSubject<User>(null);
  private activLogoutTimer: any;
  
    
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => { 
        if (user) {
          return user.id;
        } else {
          return null;
        }
      }
    ));
  }

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Plugins.Storage.get({key: 'authData'})).pipe(map(storedData => {
      if(!storedData || !storedData.value) {
        return null;
      }
      const parsedData = JSON.parse(storedData.value) as 
      {
        token: string; tokenExpDate: string; userId: string; email: string;
      };
      const expirationTime = new Date(parsedData.tokenExpDate);
      if (expirationTime <= new Date()) {
        return null;
      }
      const user = new User
      (
        parsedData.userId, parsedData.email, parsedData.token, expirationTime
      );
      return user;
      }),
      tap(user => {
        if(user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http.post<AuthInterface>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`,
      { email: email, password: password, returnSecureToken: true }
    )
    .pipe(tap(this.setUserData.bind(this)));
  }
  login(email: string, password: string) {
    return this.http.post<AuthInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
      { email: email, password: password, returnSecureToken: true}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if (this.activLogoutTimer) {
      clearTimeout(this.activLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'})
  }

  ngOnDestroy() {
    if (this.activLogoutTimer) {
      clearTimeout(this.activLogoutTimer);
    }
  }

  private autoLogout(duration: number) {
    if (this.activLogoutTimer) {
      clearTimeout(this.activLogoutTimer);
    }
    this.activLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private setUserData(userData: AuthInterface) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );

    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(userData.localId, userData.idToken, expirationTime.toISOString(), userData.email)
  }
  private storeAuthData(
    userId: string,
    token: string,
    tokenExpDate: string,
    email: string
  ) {
    const data = JSON.stringify({userId: userId, token: token, tokenExpDate: tokenExpDate, email: email});
    Plugins.Storage.set({key: 'authData', value: data});
  }
}
