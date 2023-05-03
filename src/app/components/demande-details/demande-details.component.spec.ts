import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDetailsComponent } from './demande-details.component';

describe('DemandeDetailsComponent', () => {
  let component: DemandeDetailsComponent;
  let fixture: ComponentFixture<DemandeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
