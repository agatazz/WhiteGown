import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { browser, by, element, By } from 'protractor';

import { AuthPage } from './auth.page';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient,HttpBackend } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { User } from './user.model';
import { find } from 'rxjs/operators';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;
  let authService:AuthService;
  let de: DebugElement;
  let el: HTMLElement;
  let emailEl:DebugElement;
  let passEl:DebugElement;
  let submitEl:DebugElement;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPage ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[ 
        { provide: authService, useClass: AuthService},
        { provide: Router, useClass: Router },
        { provide: LoadingController, useClass: LoadingController },
        { provide: AlertController, useClass: AlertController }, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    de=fixture.debugElement;
    emailEl=fixture.debugElement;
    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('should have a isLoading set to false', () => {
    expect(component.isLoading).toBeFalsy();
    });

  it('should have a isLogin set to true', () => {
      expect(component.isLogin).toBeTruthy();
      });  

  it('should have a title class',()=>{
    expect(component.title).toBeDefined();
  });
  
  
  it('should have a messege class',()=>{
    expect(component.messege).toBeDefined();
  });

  it('should contain elements',()=>{
    
    expect(element(by.name('password')).isPresent).toBe(true);
    expect(element(by.name('email')).isPresent).toBe(true);
    expect(element(by.name('switch')).isPresent).toBe(true);


  });
    
    
});
