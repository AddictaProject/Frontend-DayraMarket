import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayraCookiesComponent } from './dayra-cookies.component';

describe('DayraCookiesComponent', () => {
  let component: DayraCookiesComponent;
  let fixture: ComponentFixture<DayraCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayraCookiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayraCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
