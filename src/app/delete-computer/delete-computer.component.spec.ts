import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComputerComponent } from './delete-computer.component';

describe('DeleteComputerComponent', () => {
  let component: DeleteComputerComponent;
  let fixture: ComponentFixture<DeleteComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
