import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActeurComponent } from './card-acteur.component';

describe('CardActeurComponent', () => {
  let component: CardActeurComponent;
  let fixture: ComponentFixture<CardActeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardActeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
