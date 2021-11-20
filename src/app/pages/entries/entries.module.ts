import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent,
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
