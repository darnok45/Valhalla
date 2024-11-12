import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasesComponent } from './pases.component';

describe('PasesComponent', () => {
  let component: PasesComponent;
  let fixture: ComponentFixture<PasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasesComponent]
    });
    fixture = TestBed.createComponent(PasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
