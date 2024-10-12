import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtorComponent } from './modal-ator.component';

describe('ModalAtorComponent', () => {
  let component: ModalAtorComponent;
  let fixture: ComponentFixture<ModalAtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAtorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
