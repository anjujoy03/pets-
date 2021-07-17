import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToyslistComponent } from './toyslist.component';

describe('ToyslistComponent', () => {
  let component: ToyslistComponent;
  let fixture: ComponentFixture<ToyslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToyslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToyslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
