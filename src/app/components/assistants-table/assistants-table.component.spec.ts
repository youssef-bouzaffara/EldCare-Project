import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantsTableComponent } from './assistants-table.component';

describe('AssistantsTableComponent', () => {
  let component: AssistantsTableComponent;
  let fixture: ComponentFixture<AssistantsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
