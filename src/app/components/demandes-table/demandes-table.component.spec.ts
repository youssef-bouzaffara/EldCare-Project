import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesTableComponent } from './demandes-table.component';

describe('DemandesTableComponent', () => {
  let component: DemandesTableComponent;
  let fixture: ComponentFixture<DemandesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
