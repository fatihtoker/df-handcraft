import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTypesListComponent } from './parameter-types-list.component';

describe('ParameterTypesListComponent', () => {
  let component: ParameterTypesListComponent;
  let fixture: ComponentFixture<ParameterTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
