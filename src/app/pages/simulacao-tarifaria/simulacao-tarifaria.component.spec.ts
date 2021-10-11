import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoTarifariaComponent } from './simulacao-tarifaria.component';

describe('SimulacaoTarifariaComponent', () => {
  let component: SimulacaoTarifariaComponent;
  let fixture: ComponentFixture<SimulacaoTarifariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacaoTarifariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacaoTarifariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
