/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PairsWellCartComponent } from './PairsWellCart.component';

describe('PairsWellCartComponent', () => {
  let component: PairsWellCartComponent;
  let fixture: ComponentFixture<PairsWellCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairsWellCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsWellCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
