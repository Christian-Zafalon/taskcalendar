import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/shared/service/schedule.service';


@Component({
  selector: 'app-agenda-form-dialog',
  templateUrl: './agenda-form-dialog.component.html',
  styleUrls: ['./agenda-form-dialog.component.css']
})
export class AgendaFormDialogComponent implements OnInit {
  public agendaForm!: FormGroup;
  TIME_REGEX = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  constructor(
    public dialogRef: MatDialogRef<AgendaFormDialogComponent>,
    private fb: FormBuilder,
    private agendaService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.agendaForm = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required, Validators.maxLength(25)]],
      date: [this.data ? this.data.date : '', Validators.required],
      starttime: [this.data ? this.data.starttime : '', [Validators.required]],
      endtime: [this.data ? this.data.endtime : '', [Validators.required]],
      notes: [this.data ? this.data.notes : '', Validators.required],
      done: [false]
    });
  }


  cancel() {
    this.dialogRef.close();
  }

  createSchedule() {
    // this.agendaService.addAgenda(this.agendaForm.value);
    // window.location.reload();
    if (this.agendaForm.valid) {
      if (this.data) {
        this.agendaService.updateAgenda(this.data.id, this.agendaForm.value);
      } else {
        this.agendaService.addAgenda(this.agendaForm.value);
      }
      window.location.reload();
    }
  }
}
