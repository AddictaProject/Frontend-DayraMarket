import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalSignUpComponent } from './external-sign-up.component';

describe('ExternalSignUpComponent', () => {
  let component: ExternalSignUpComponent;
  let fixture: ComponentFixture<ExternalSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
