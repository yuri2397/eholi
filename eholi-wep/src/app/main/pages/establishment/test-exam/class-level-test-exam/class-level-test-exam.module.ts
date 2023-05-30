import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassLevelTestExamComponent } from './class-level-test-exam.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../../../../shared/shared.module';
import {ContentHeaderModule} from '../../../../../layout/components/content-header/content-header.module';
import {CreateClassLevelTestExamComponent} from '../create-class-level-test-exam/create-class-level-test-exam.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CoreCommonModule} from '../../../../../../@core/common.module';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    ClassLevelTestExamComponent,
    CreateClassLevelTestExamComponent
  ],
  exports: [
    ClassLevelTestExamComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ContentHeaderModule,
        NgSelectModule,
        ReactiveFormsModule,
        CoreCommonModule,
        RouterModule,
        NgxDatatableModule,
        SweetAlert2Module,
    ],
})
export class ClassLevelTestExamModule { }
