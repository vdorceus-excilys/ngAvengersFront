import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComputerComponent } from './details-computer.component';

describe('DetailsComputerComponent', () => {
  let component: DetailsComputerComponent;
  let fixture: ComponentFixture<DetailsComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
