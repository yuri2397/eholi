import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTimesTablesComponent } from './add-times-tables/add-times-tables.component';
import {RouterModule, Routes} from '@angular/router';
import { UpdateTimesTablesComponent } from './update-times-tables/update-times-tables.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TimesTablesDetailsResolver} from '../resolvers/times_tables_details.resolver';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import { CoreSidebarModule } from '@core/components';
import { CalendarModule } from 'app/main/apps/calendar/calendar.module';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
    {
        path: 'add/:id',
        component: AddTimesTablesComponent,
        resolve: {
            data: TimesTablesDetailsResolver
        }
    },
];

@NgModule({
    declarations: [
        AddTimesTablesComponent,
        UpdateTimesTablesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CalendarModule,
        FullCalendarModule,
        CoreSidebarModule,
        TranslateModule,
        NgSelectModule,
        FormsModule,
        Ng2FlatpickrModule,
        SharedModule
    ]
})
export class TimesTablesModule { }
