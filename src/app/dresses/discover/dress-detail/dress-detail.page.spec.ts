import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DressDetailPage } from './dress-detail.page';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/booking.service';
import { LoadingController } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { element, by } from 'protractor';

describe('DressDetailPage', () => {
  let component: DressDetailPage;
  let fixture: ComponentFixture<DressDetailPage>;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;
  let BookingService:BookingService;
  let authService:AuthService;
  let de: DebugElement;
  let router:Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DressDetailPage ],
      imports: [HttpClientTestingModule],
      providers : [
        {provide: BookingService,useClass:BookingService },
        {provide: authService,useClass:AuthService },
        {provide: LoadingController,useClass:LoadingController },
        {provide: router,useClass:Router },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DressDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isBookable should be set to false' , ()=>{
    expect(component.isBookable).toBeFalsy();


  });

  it('isLoading should be set to false' , ()=>{
    expect(component.isLoading).toBeFalsy();


  });

  it('title should state detailed informations' , () => {
    expect(component.title).toMatch('Detailed informations');


  });

  it('title should state detailed informations' , () => {
    expect(component.dress).toBeDefined();
  });

  it('should contain elements',()=>{
    
    expect(element(by.name('button1')).isPresent).toBe(true);
    expect(element(by.name('button2')).isPresent).toBe(true);
    expect(element(by.name('title')).isPresent).toBe(true);


  });




  


});
