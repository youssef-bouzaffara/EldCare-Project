import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAssistantComponent } from './contact-assistant.component';

describe('ContactAssistantComponent', () => {
  let component: ContactAssistantComponent;
  let fixture: ComponentFixture<ContactAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
