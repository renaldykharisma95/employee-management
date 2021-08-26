import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeActionsComponent } from './employee-actions.component';

describe('EmployeeActionsComponent', () => {
  let component: EmployeeActionsComponent;
  let fixture: ComponentFixture<EmployeeActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
