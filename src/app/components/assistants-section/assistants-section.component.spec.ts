import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantsSectionComponent } from './assistants-section.component';

describe('AssistantsSectionComponent', () => {
  let component: AssistantsSectionComponent;
  let fixture: ComponentFixture<AssistantsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
