import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DetailsTestExamsComponent} from './details-test-exams/details-test-exams.component';
import {SetTestExamResultsComponent} from './set-test-exam-results/set-test-exam-results.component';
import { ListTestExamsComponent } from './list-test-exams/list-test-exams.component';
import {ListTestExamsResolver} from '../resolvers/list-test-exams.resolver';
import {DetailsTestExamResolver} from '../resolvers/details-test-exam.resolver';
import {TranslateModule} from '@ngx-translate/core';
import {ContentHeaderModule} from '../../../../layout/components/content-header/content-header.module';
import {SharedModule} from '../../../../shared/shared.module';
import {ClassLevelDeliberationComponent} from './class-level-deliberation/class-level-deliberation.component';

const routes: Routes = [
    {
      path: '',
        component: ListTestExamsComponent,
        resolve: {
          list: ListTestExamsResolver
        }
    },
    {
        path: ':uuid/details',
        component: DetailsTestExamsComponent,
        resolve: {
            data: DetailsTestExamResolver
        }
    },
    {
        path: 'set-results/:uuid',
        component: SetTestExamResultsComponent,
    },
    {
        path: 'deliberation',
        component: ClassLevelDeliberationComponent
    }
];

@NgModule({
    declarations: [
        DetailsTestExamsComponent,
        SetTestExamResultsComponent,
        ListTestExamsComponent,
        ClassLevelDeliberationComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ContentHeaderModule,
        SharedModule,
    ]
})
export class TestExamModule {
}
