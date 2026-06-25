import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLista } from './auto-lista';

describe('AutoLista', () => {
  let component: AutoLista;
  let fixture: ComponentFixture<AutoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
