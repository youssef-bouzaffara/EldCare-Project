import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDemandesTableComponent } from './user-demandes-table.component';

describe('UserDemandesTableComponent', () => {
  let component: UserDemandesTableComponent;
  let fixture: ComponentFixture<UserDemandesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDemandesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDemandesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
