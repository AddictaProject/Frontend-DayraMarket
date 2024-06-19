import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAddressComponent } from './default-address.component';

describe('DefaultAddressComponent', () => {
  let component: DefaultAddressComponent;
  let fixture: ComponentFixture<DefaultAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
