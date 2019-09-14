import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTypesAddComponent } from './parameter-types-add.component';

describe('ParameterTypesAddComponent', () => {
  let component: ParameterTypesAddComponent;
  let fixture: ComponentFixture<ParameterTypesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterTypesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
