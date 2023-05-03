import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssistantComponent } from './dashboard-assistant.component';

describe('DashboardAssistantComponent', () => {
  let component: DashboardAssistantComponent;
  let fixture: ComponentFixture<DashboardAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
