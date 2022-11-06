import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ClassRoomsComponent } from './class-rooms/class-rooms.component'
import { ClassLevelsComponent } from './class-levels/class-levels.component'
import { CoursesComponent } from './courses/courses.component'
import { HousingComponent } from './housing/housing.component'
import { SchoolYearsComponent } from './school-years/school-years.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: {
      animation: 'list',
    },
  },
  {
    path: 'classrooms',
    component: ClassRoomsComponent,
    data: {
      animation: 'list',
    },
  },
  {
    path: 'class-levels',
    component: ClassLevelsComponent,
    data: {
      animation: 'list',
    },
  },
  {
    path: 'housing',
    component: HousingComponent,
    data: {
      animation: 'list',
    },
  },
  {
    path: 'school-years',
    component: SchoolYearsComponent,
    data: {
      animation: 'list',
    },
  },
]

@NgModule({
  declarations: [
    ClassRoomsComponent,
    ClassLevelsComponent,
    CoursesComponent,
    HousingComponent,
    SchoolYearsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EstablishmentModule {}
