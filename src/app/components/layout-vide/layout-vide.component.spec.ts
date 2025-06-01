import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVideComponent } from './layout-vide.component';

describe('LayoutVideComponent', () => {
  let component: LayoutVideComponent;
  let fixture: ComponentFixture<LayoutVideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutVideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutVideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
