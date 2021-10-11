import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacaoFaturasComponent } from './comparacao-faturas.component';

describe('ComparacaoFaturasComponent', () => {
  let component: ComparacaoFaturasComponent;
  let fixture: ComponentFixture<ComparacaoFaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparacaoFaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparacaoFaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
