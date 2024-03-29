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

  constructor(
    public dialogRef: MatDialogRef<AgendaFormDialogComponent>,
    private fb: FormBuilder,
    private agendaService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.agendaForm = this.fb.group({
      title: [this.data ? this.data.title : '', Validators.required],
      date: [this.data ? this.data.date : '', Validators.required],
      time: [this.data ? this.data.time : '', Validators.required],
      notes: [this.data ? this.data.notes : '', Validators.required]
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
