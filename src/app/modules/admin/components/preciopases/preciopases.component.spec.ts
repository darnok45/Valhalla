import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciopasesComponent } from './preciopases.component';

describe('PreciopasesComponent', () => {
  let component: PreciopasesComponent;
  let fixture: ComponentFixture<PreciopasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreciopasesComponent]
    });
    fixture = TestBed.createComponent(PreciopasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
