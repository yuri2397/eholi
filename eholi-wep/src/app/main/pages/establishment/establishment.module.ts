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
import { CreateClassLevelComponent } from './class-levels/create-class-level/create-class-level.component'
import { EditClassLevelComponent } from './class-levels/edit-class-level/edit-class-level.component'
import { ShowClassLevelComponent } from './class-levels/show-class-level/show-class-level.component'
import { ShowClassLevelResolver } from './resolvers/show-class-level.resolver'
import { CreateRoomComponent } from './housing/create-room/create-room.component'
import { EditRoomComponent } from './housing/edit-room/edit-room.component'
import { StudentListResolver } from '../student/resolvers/student-list.resolver'

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
    path: 'class-levels/:uuid',
    component: ShowClassLevelComponent,
    resolve: {
      class_level: ShowClassLevelResolver,
      students: StudentListResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      animation: 'details',
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
    CreateClassLevelComponent,
    EditClassLevelComponent,
    ShowClassLevelComponent,
    CreateRoomComponent,
    EditRoomComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class EstablishmentModule {}
