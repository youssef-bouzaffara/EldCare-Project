import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantBoxComponent } from './assistant-box.component';

describe('AssistantBoxComponent', () => {
  let component: AssistantBoxComponent;
  let fixture: ComponentFixture<AssistantBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
