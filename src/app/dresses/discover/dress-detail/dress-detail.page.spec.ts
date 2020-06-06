import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DressDetailPage } from './dress-detail.page';

describe('DressDetailPage', () => {
  let component: DressDetailPage;
  let fixture: ComponentFixture<DressDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DressDetailPage ],
      providers :[],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DressDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
