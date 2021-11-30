import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovinaComponent } from './imovina.component';

describe('ImovinaComponent', () => {
  let component: ImovinaComponent;
  let fixture: ComponentFixture<ImovinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImovinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImovinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
