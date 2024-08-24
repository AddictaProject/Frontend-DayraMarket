/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Block2Component } from './block2.component';

describe('Block2Component', () => {
  let component: Block2Component;
  let fixture: ComponentFixture<Block2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Block2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Block2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
