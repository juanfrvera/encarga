import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzarComponent } from './comenzar.component';

describe('ComenzarComponent', () => {
  let component: ComenzarComponent;
  let fixture: ComponentFixture<ComenzarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComenzarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComenzarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
