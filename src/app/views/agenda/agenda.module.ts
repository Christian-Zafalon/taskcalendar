import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AgendaListComponent } from './home/agenda-list/agenda-list.component';
import { AgendaFormDialogComponent } from './home/agenda-form-dialog/agenda-form-dialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    HomeComponent,
    AgendaListComponent,
    AgendaFormDialogComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DatePipe,
    DragDropModule,
    MatGridListModule
  ],
providers: [DatePipe]
})
export class AgendaModule { }
