import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisershopComponent } from './regisershop.component';

describe('RegisershopComponent', () => {
  let component: RegisershopComponent;
  let fixture: ComponentFixture<RegisershopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisershopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisershopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
