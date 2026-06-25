import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAutos } from './filtros-autos';

describe('FiltrosAutos', () => {
  let component: FiltrosAutos;
  let fixture: ComponentFixture<FiltrosAutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosAutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosAutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
