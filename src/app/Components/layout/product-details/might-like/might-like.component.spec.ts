/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MightLikeComponent } from './might-like.component';

describe('MightLikeComponent', () => {
  let component: MightLikeComponent;
  let fixture: ComponentFixture<MightLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MightLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MightLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
