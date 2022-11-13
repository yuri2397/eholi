import { SchoolYearsResolver } from './resolvers/school-years.resolver'
import { RoomResolver } from './resolvers/room.resolver'
import { ClassLevelsResolver } from './resolvers/class-levels.resolver'
import { ClassRoomsResolver } from './resolvers/class-rooms.resolver'
import { CoursesResolver } from './resolvers/courses.resolver'
import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ClassRoomsComponent } from './class-rooms/class-rooms.component'
import { ClassLevelsComponent } from './class-levels/class-levels.component'
import { CoursesComponent } from './courses/courses.component'
import { HousingComponent } from './housing/housing.component'
import { SchoolYearsComponent } from './school-years/school-years.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreCommonModule } from '@core/common.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from 'app/shared/shared.module'
import { CreateClassRoomComponent } from './class-rooms/create-class-room/create-class-room.component'
import { EditClassRoomComponent } from './class-rooms/edit-class-room/edit-class-room.component'

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'courses',
  //   pathMatch: 'full',
  // },
  {
    path: 'courses',
    component: CoursesComponent,
    resolve: {
      courses: CoursesResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      animation: 'list',
    },
  },
  {
    path: 'classrooms',
    component: ClassRoomsComponent,
    resolve: {
      class_rooms: ClassRoomsResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      animation: 'list',
    },
  },
  {
    path: 'class-levels',
    component: ClassLevelsComponent,
    resolve: {
      class_levels: ClassLevelsResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    data: {
      animation: 'list',
    },
  },
  {
    path: 'housing',
    component: HousingComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    resolve: {
      rooms: RoomResolver,
    },
    data: {
      animation: 'list',
    },
  },
  {
    path: 'school-years',
    component: SchoolYearsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    resolve: {
      school_years: SchoolYearsResolver,
    },
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
    CreateClassRoomComponent,
    EditClassRoomComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class EstablishmentModule {}
