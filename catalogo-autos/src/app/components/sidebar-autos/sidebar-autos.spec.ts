import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAutos } from './sidebar-autos';

describe('SidebarAutos', () => {
  let component: SidebarAutos;
  let fixture: ComponentFixture<SidebarAutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
