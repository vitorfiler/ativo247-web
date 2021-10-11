import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoEnergiaComponent } from './gestao-energia.component';

describe('GestaoEnergiaComponent', () => {
  let component: GestaoEnergiaComponent;
  let fixture: ComponentFixture<GestaoEnergiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoEnergiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
