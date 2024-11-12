import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablemaquinasComponent } from './tablemaquinas.component';

describe('TablemaquinasComponent', () => {
  let component: TablemaquinasComponent;
  let fixture: ComponentFixture<TablemaquinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablemaquinasComponent]
    });
    fixture = TestBed.createComponent(TablemaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
