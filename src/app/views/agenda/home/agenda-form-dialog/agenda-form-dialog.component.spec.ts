import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaFormDialogComponent } from './agenda-form-dialog.component';

describe('AgendaFormDialogComponent', () => {
  let component: AgendaFormDialogComponent;
  let fixture: ComponentFixture<AgendaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
