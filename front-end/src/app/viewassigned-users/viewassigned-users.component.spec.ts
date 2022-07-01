import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassignedUsersComponent } from './viewassigned-users.component';

describe('ViewassignedUsersComponent', () => {
  let component: ViewassignedUsersComponent;
  let fixture: ComponentFixture<ViewassignedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewassignedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewassignedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
