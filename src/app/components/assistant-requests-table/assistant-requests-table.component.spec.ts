import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantRequestsTableComponent } from './assistant-requests-table.component';

describe('AssistantRequestsTableComponent', () => {
  let component: AssistantRequestsTableComponent;
  let fixture: ComponentFixture<AssistantRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
