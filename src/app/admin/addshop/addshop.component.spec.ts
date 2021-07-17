import { ComponentFixture, TestBed } from '@angular/core/testing';
import{ReactiveFormsModule,FormsModule} from '@angular/forms'

import { AddshopComponent } from './addshop.component';

describe('AddshopComponent', () => {
  let component: AddshopComponent;
  let fixture: ComponentFixture<AddshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddshopComponent ],
      imports:[ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
