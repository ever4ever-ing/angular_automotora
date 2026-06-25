import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDetalle } from './auto-detalle';

describe('AutoDetalle', () => {
  let component: AutoDetalle;
  let fixture: ComponentFixture<AutoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
