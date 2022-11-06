import { EcardResolver } from '../ecard/resolvers/ecard.resolver'
import { StudentShowResolver } from './resolvers/student-show.resolver'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudentListComponent } from './student-list/student-list.component'
import { AuthGuard } from 'app/auth/helpers/auth.guards'
import { StudentListResolver } from './resolvers/student-list.resolver'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreCommonModule } from '@core/common.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from 'app/shared/shared.module'
import { StudentShowComponent } from './student-show/student-show.component'
import { EcardComponent } from '../ecard/ecard.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { StudentDashboardResolver } from './resolvers/student-dashboard.resolver'
import { RegistrationComponent } from './registration/registration.component'
import { AdmissionComponent } from './admission/admission.component'
import { FeesComponent } from './fees/fees.component'

const routes: Routes = [
  {
    path: 'students/index',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    resolve: {
      students: StudentListResolver,
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
  {
    path: 'registrations',
    component: RegistrationComponent,
  },
  {
    path: 'fees',
    component: FeesComponent,
  },
  {
    path: 'admissions',
    component: AdmissionComponent,
  },
]

@NgModule({
  declarations: [
    StudentListComponent,
    StudentShowComponent,
    RegistrationComponent,
    AdmissionComponent,
    FeesComponent,
  ],
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
