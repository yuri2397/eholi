import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecitationComponent } from './recitation.component';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { RecitationDetailsComponent } from './recitation-details/recitation-details.component';
import { RecitationDetailResolver } from './resolvers/recitations.resolver';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { ProgressionItemDetailsComponent } from './progression-item-details/progression-item-details.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AttachSourahToStudentComponent } from './attach-sourah-to-student/attach-sourah-to-student.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'progressions/index',
    component: RecitationComponent,
    canActivate: [AuthGuard],
    data: { animation: 'list' },
  },
  {
    path: 'progressions/:uuid',
    component: RecitationDetailsComponent,
    canActivate: [AuthGuard],
    resolve: {
      progression: RecitationDetailResolver
    },
    runGuardsAndResolvers: 'always',
    data: { animation: 'details' },
  },
  // {
  //   path: 'progressions-items/:uuid',
  //   component: RecitationDetailsComponent,
  //   canActivate: [AuthGuard],
  //   resolve: {
  //     progression: RecitationDetailResolver
  //   },
  //   data: { animation: 'details' },
  // },
  
]


@NgModule({
  declarations: [
    RecitationComponent,
    RecitationDetailsComponent,
    ProgressionItemDetailsComponent,
    AttachSourahToStudentComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule, NzCollapseModule, NzListModule, NzAutocompleteModule, ReactiveFormsModule],

})
export class RecitationModule { }
