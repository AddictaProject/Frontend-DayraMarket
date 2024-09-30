/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorageVariantComponent } from './OtherVariant.component';

describe('StorageVariantComponent', () => {
  let component: StorageVariantComponent;
  let fixture: ComponentFixture<StorageVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
