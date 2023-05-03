import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantInfoComponent } from './assistant-info.component';

describe('AssistantInfoComponent', () => {
  let component: AssistantInfoComponent;
  let fixture: ComponentFixture<AssistantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
