import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsAndRefundsComponent } from './returns-and-refunds.component';

describe('ReturnsAndRefundsComponent', () => {
  let component: ReturnsAndRefundsComponent;
  let fixture: ComponentFixture<ReturnsAndRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsAndRefundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnsAndRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
