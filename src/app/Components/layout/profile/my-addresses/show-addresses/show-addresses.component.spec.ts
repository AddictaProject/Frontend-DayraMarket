import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAddressesComponent } from './show-addresses.component';

describe('ShowAddressesComponent', () => {
  let component: ShowAddressesComponent;
  let fixture: ComponentFixture<ShowAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAddressesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
