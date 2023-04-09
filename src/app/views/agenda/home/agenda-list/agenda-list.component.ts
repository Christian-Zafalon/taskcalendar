import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/shared/model/schedule';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AgendaFormDialogComponent } from '../agenda-form-dialog/agenda-form-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommitmentFulfilledService } from 'src/app/shared/service/commitment-fulfilled.service';


@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {

  agendas: Schedule[] = [];
  taskPerformed!: Schedule[];

  constructor(
    private agendaService: ScheduleService, 
    private commitmentFulFilled: CommitmentFulfilledService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAgendas();
    this.getFinished();
  }

  getAgendas(): void {
    this.agendaService.getAgendas()
      .subscribe(agendas => this.agendas = agendas);
  }

  getFinished(): void {
    this.commitmentFulFilled.getFinalizedSchedule()
      .subscribe(commitmentFinalized => this.taskPerformed = commitmentFinalized);
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

  drop(evento: CdkDragDrop<Schedule[]>) {
    debugger
    if (evento.previousContainer === evento.container) {
      moveItemInArray(evento.container.data, evento.previousIndex, evento.currentIndex);
    } else {
      transferArrayItem(evento.previousContainer.data,
                        evento.container.data,
                        evento.previousIndex,
                        evento.currentIndex);
      console.log(evento.container.data); // Verificar se o array está sendo corretamente passado
      evento.container.data[evento.currentIndex].done = evento.container.id === 'doneList';
    }
  }

  // drop(event: CdkDragDrop<Schedule[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
  
  
  
  
  
  
}
