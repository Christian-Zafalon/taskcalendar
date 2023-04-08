import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/model/schedule';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AgendaFormDialogComponent } from '../agenda-form-dialog/agenda-form-dialog.component';


@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {

  agendas: Schedule[] = [];
  constructor(
    private agendaService: ScheduleService, 
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAgendas();
  }

  getAgendas(): void {
    this.agendaService.getAgendas()
      .subscribe(agendas => this.agendas = agendas);
  }

  deleteSchedule(id: number) {
    this.agendaService.deleteAgenda(id);
    window.location.reload();
  }

  editSchedule(schedule: Schedule): void {
    const dialogRef = this.dialog.open(AgendaFormDialogComponent, {
      width: '450px',
      data: schedule
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
