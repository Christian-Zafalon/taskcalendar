import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/model/schedule';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {

  agendas: Schedule[] = [];
  constructor(private agendaService: ScheduleService, private datePipe: DatePipe) { }

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
}
