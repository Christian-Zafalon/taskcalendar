import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/shared/service/schedule.service';


@Component({
  selector: 'app-agenda-form-dialog',
  templateUrl: './agenda-form-dialog.component.html',
  styleUrls: ['./agenda-form-dialog.component.css']
})
export class AgendaFormDialogComponent implements OnInit{
public agendaForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgendaFormDialogComponent>,
    private fb: FormBuilder,
    private agendaService: ScheduleService
    )
    {

    }

ngOnInit(): void {
  this.agendaForm = this.fb.group({
    title: ['',Validators.required],
    date: ['',Validators.required],
    time: ['',Validators.required],
    notes: ['',Validators.required],
  });
}

cancel(){
  this.dialogRef.close();
}

createSchedule() {
  this.agendaService.addAgenda(this.agendaForm.value);
  window.location.reload();
}
}
