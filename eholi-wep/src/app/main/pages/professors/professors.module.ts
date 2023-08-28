import { CourseProfessorResolverResolver } from './resolvers/course-professor-resolver.resolver'
import { ProfessorsResolver } from './resolvers/professors.resolver'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfessorsComponent } from './professors.component'
import { AuthGuard } from 'app/auth/helpers'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { CreateProfessorComponent } from './create-professor/create-professor.component'
import { ShowProfessorComponent } from './show-professor/show-professor.component'
import { ProfessorDetailsResolver } from './resolvers/professor-details.resolver'
import { AttachCouresProfessorComponent } from './attach-course-professor/attach-course-professor.component'

const routes: Routes = [
  {
    path: 'professors/index',
    component: ProfessorsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    resolve: {
      professors: ProfessorsResolver,
    },
    data: { animation: 'list' },
  },
  {
    path: 'professors/:id',
    component: ShowProfessorComponent,
    resolve: {
      professor: ProfessorDetailsResolver,
      courses: CourseProfessorResolverResolver,
    },
    data: {
      animation: 'details'
    }
  },
]

@NgModule({
  declarations: [
    ProfessorsComponent,
    CreateProfessorComponent,
    ShowProfessorComponent,
    AttachCouresProfessorComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class ProfessorsModule {}
