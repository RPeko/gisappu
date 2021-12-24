import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerMenuComponent } from './lower-menu.component';

describe('LowerMenuComponent', () => {
  let component: LowerMenuComponent;
  let fixture: ComponentFixture<LowerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LowerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
