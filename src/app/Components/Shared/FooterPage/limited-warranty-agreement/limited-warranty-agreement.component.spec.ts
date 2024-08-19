import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedWarrantyAgreementComponent } from './limited-warranty-agreement.component';

describe('LimitedWarrantyAgreementComponent', () => {
  let component: LimitedWarrantyAgreementComponent;
  let fixture: ComponentFixture<LimitedWarrantyAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitedWarrantyAgreementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimitedWarrantyAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
