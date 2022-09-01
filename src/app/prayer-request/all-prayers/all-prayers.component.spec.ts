import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPrayersComponent } from './all-prayers.component';

describe('AllPrayersComponent', () => {
  let component: AllPrayersComponent;
  let fixture: ComponentFixture<AllPrayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPrayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPrayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
