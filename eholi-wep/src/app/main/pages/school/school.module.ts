import { TutorsResolver } from './resolvers/tutors.resolver'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TutorsComponent } from './tutors/tutors.component'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'app/auth/helpers'
import { SharedModule } from 'app/shared/shared.module'

const routes: Routes = [
  {
    path: 'tutors/index',
    component: TutorsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { tutors: TutorsResolver },
    data: { aniation: 'list' },
  },
]

@NgModule({
  declarations: [TutorsComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class SchoolModule {}
