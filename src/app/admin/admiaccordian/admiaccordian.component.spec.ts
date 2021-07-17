import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiaccordianComponent } from './admiaccordian.component';

describe('AdmiaccordianComponent', () => {
  let component: AdmiaccordianComponent;
  let fixture: ComponentFixture<AdmiaccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiaccordianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiaccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
