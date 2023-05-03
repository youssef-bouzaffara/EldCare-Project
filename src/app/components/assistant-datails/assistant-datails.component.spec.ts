import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantDatailsComponent } from './assistant-datails.component';

describe('AssistantDatailsComponent', () => {
  let component: AssistantDatailsComponent;
  let fixture: ComponentFixture<AssistantDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
