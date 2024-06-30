/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddressAddingComponent } from './Address-Adding.component';

describe('AddressAddingComponent', () => {
  let component: AddressAddingComponent;
  let fixture: ComponentFixture<AddressAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
