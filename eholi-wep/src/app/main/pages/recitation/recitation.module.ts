import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecitationComponent } from './recitation.component';
import { AuthGuard } from 'app/auth/helpers';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { RecitationDetailsComponent } from './recitation-details/recitation-details.component';
import { RecitationDetailResolver } from './resolvers/recitations.resolver';

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
    data: { animation: 'details' },
  },
  
]


@NgModule({
  declarations: [
    RecitationComponent,
    RecitationDetailsComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule],

})
export class RecitationModule { }
