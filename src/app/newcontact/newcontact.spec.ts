import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Newcontact } from './newcontact';

describe('Newcontact', () => {
  let component: Newcontact;
  let fixture: ComponentFixture<Newcontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newcontact],
    }).compileComponents();

    fixture = TestBed.createComponent(Newcontact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
