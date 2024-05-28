/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PairsWellComponent } from './pairs-well.component';

describe('PairsWellComponent', () => {
  let component: PairsWellComponent;
  let fixture: ComponentFixture<PairsWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairsWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
