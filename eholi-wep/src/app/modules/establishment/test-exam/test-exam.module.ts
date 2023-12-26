import { DeliberationDetailsResolver } from './../resolvers/deliberation-details.resolver';
import { DeliberationResolver } from './../resolvers/deliberation.resolver';
import { ClassLevelSemesterResolver } from '../resolvers/class_level_semester.resolver';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DetailsTestExamsComponent} from './details-test-exams/details-test-exams.component';
import {SetTestExamResultsComponent} from './set-test-exam-results/set-test-exam-results.component';
import { ListTestExamsComponent } from './list-test-exams/list-test-exams.component';
import {ListTestExamsResolver} from '../resolvers/list-test-exams.resolver';
import {DetailsTestExamResolver} from '../resolvers/details-test-exam.resolver';
import {TranslateModule} from '@ngx-translate/core';
import {ClassLevelDeliberationComponent} from './class-level-deliberation/class-level-deliberation.component';
import { ClassLevelDeliberationResultatsComponent } from './class-level-deliberation-resultats/class-level-deliberation-resultats.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SharedModule } from 'app/shared/shared.module';

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
        component: ClassLevelDeliberationComponent,
        resolve: {
            semester: ClassLevelSemesterResolver,
            deliberation: DeliberationResolver
        },
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'deliberation/:uuid',
        component: ClassLevelDeliberationResultatsComponent,
        resolve: {
            deliberation: DeliberationDetailsResolver,
        },
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        DetailsTestExamsComponent,
        SetTestExamResultsComponent,
        ListTestExamsComponent,
        ClassLevelDeliberationComponent,
        ClassLevelDeliberationResultatsComponent
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
