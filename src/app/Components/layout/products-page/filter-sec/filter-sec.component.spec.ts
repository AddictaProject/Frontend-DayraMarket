import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSecComponent } from './filter-sec.component';

describe('FilterSecComponent', () => {
  let component: FilterSecComponent;
  let fixture: ComponentFixture<FilterSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
