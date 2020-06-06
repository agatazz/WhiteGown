import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DressesPage } from './dresses.page';

describe('DressesPage', () => {
  let component: DressesPage;
  let fixture: ComponentFixture<DressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DressesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
