/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotSignedInComponent } from './Not-SignedIn.component';

describe('NotSignedInComponent', () => {
  let component: NotSignedInComponent;
  let fixture: ComponentFixture<NotSignedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSignedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSignedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
