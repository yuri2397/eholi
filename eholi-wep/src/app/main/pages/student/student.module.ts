import { EcardResolver } from '../ecard/resolvers/ecard.resolver'
import { StudentShowResolver } from './resolvers/student-show.resolver'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudentComponent } from './student.component'
import { AuthGuard } from 'app/auth/helpers/auth.guards'
import { StudentResolver } from './resolvers/student.resolver'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreCommonModule } from '@core/common.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from 'app/shared/shared.module'
import { StudentShowComponent } from './student-show/student-show.component'
import { EcardComponent } from '../ecard/ecard.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { StudentDashboardResolver } from './resolvers/student-dashboard.resolver'
const routes: Routes = [
  {
    path: 'students/index',
    component: StudentComponent,
    canActivate: [AuthGuard],
    resolve: {
      students: StudentResolver,
    },
    data: { animation: 'list' },
  },
  {
    path: 'students/show/:uuid',
    component: StudentShowComponent,
    canActivate: [AuthGuard],
    resolve: {
      student: StudentShowResolver,
    },
    data: { animation: 'details' },
  },
  {
    path: 'students/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      student: StudentDashboardResolver,
    },
    data: { animation: 'details' },
  },
]

@NgModule({
  declarations: [StudentComponent, StudentShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    SharedModule,
  ],
})
export class StudentModule {}
