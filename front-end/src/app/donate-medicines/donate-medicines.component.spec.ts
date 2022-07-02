import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateMedicinesComponent } from './donate-medicines.component';

describe('DonateMedicinesComponent', () => {
  let component: DonateMedicinesComponent;
  let fixture: ComponentFixture<DonateMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
