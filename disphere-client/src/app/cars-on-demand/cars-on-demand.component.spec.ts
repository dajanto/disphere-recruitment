import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOnDemandComponent } from './cars-on-demand.component';

describe('CarsOnDemandComponent', () => {
  let component: CarsOnDemandComponent;
  let fixture: ComponentFixture<CarsOnDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOnDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOnDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
