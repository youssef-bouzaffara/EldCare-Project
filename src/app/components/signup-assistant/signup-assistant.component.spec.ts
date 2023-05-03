import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAssistantComponent } from './signup-assistant.component';

describe('SignupAssistantComponent', () => {
  let component: SignupAssistantComponent;
  let fixture: ComponentFixture<SignupAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
