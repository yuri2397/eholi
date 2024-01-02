import { DetailCourseResolver } from "./resolvers/detail-course.resolver";
import { SchoolYearsResolver } from "./resolvers/school-years.resolver";
import { RoomResolver } from "./resolvers/room.resolver";
import { ClassLevelsResolver } from "./resolvers/class-levels.resolver";
import { ClassRoomsResolver } from "./resolvers/class-rooms.resolver";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClassRoomsComponent } from "./class-rooms/class-rooms.component";
import { ClassLevelsComponent } from "./class-levels/class-levels.component";
import { CoursesComponent } from "./courses/courses.component";
import { HousingComponent } from "./housing/housing.component";
import { SchoolYearsComponent } from "./school-years/school-years.component";
import { SharedModule } from "app/shared/shared.module";
import { CreateClassRoomComponent } from "./class-rooms/create-class-room/create-class-room.component";
import { EditClassRoomComponent } from "./class-rooms/edit-class-room/edit-class-room.component";
import { CreateClassLevelComponent } from "./class-levels/create-class-level/create-class-level.component";
import { EditClassLevelComponent } from "./class-levels/edit-class-level/edit-class-level.component";
import { ShowClassLevelComponent } from "./class-levels/show-class-level/show-class-level.component";
import { ShowClassLevelResolver } from "./resolvers/show-class-level.resolver";
import { CreateRoomComponent } from "./housing/create-room/create-room.component";
import { EditRoomComponent } from "./housing/edit-room/edit-room.component";
import { CreateClassCourseComponent } from "./courses/create-class-course/create-class-course.component";
import { ClassLevelCourseResolver } from "./resolvers/class-level-courses.resolver";
import { ClassLevelFullResolver } from "./resolvers/class-level-full.resolver";
import { SemesterFullResolver } from "./resolvers/semester-full.resolver";
import { UpdateClassCourseComponent } from "./courses/update-class-course/update-class-course.component";
import { DetailCourseComponent } from "./courses/detail-course/detail-course.component";
import { TimesTablesModule } from "./times-tables/times-tables.module";
import { ClassLevelTestExamModule } from "./test-exam/class-level-test-exam/class-level-test-exam.module";
import { ClassLevelTestsResolver } from "./resolvers/class-level-tests.resolver";
import { StudentListResolver } from "app/main/pages/student/resolvers/student-list.resolver";
import { Building } from "./establishment.model";
import { BuildingComponent } from "./building/building.component";
import { BuildingResolver } from "./resolvers/building.resolver";
import { BuildingModule } from "./building/building.module";
import { TimesTablesDetailsResolver } from "./resolvers/times_tables_details.resolver";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'courses',
  //   pathMatch: 'full',
  // },
  {
    path: "courses",
    component: CoursesComponent,
    resolve: {
      courses: ClassLevelCourseResolver,
      class_levels: ClassLevelFullResolver,
      semesters: SemesterFullResolver,
    },
    runGuardsAndResolvers: "always",
    data: {
      animation: "list",
    },
  },
  {
    path: "buildings",
    component: BuildingComponent,
    resolve: {
        buildings: BuildingResolver
    },
    data: {
      animation: "list",
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",

  },
  {
    path: "courses/:uuid",
    component: DetailCourseComponent,
    resolve: {
      course: DetailCourseResolver,
    },
    runGuardsAndResolvers: "always",

    data: {
      animation: "details",
    },
  },
  {
    path: "classrooms",
    component: ClassRoomsComponent,
    resolve: {
      class_rooms: ClassRoomsResolver,
    },
    runGuardsAndResolvers: "always",
    data: {
      animation: "list",
    },
  },
  {
    path: "class-levels",
    component: ClassLevelsComponent,
    resolve: {
      class_levels: ClassLevelsResolver,
    },
    runGuardsAndResolvers: "always",

    data: {
      animation: "list",
    },
  },
  {
    path: "class-levels/:uuid",
    component: ShowClassLevelComponent,
    resolve: {
      class_level: ShowClassLevelResolver,
      students: StudentListResolver,
      test_exams: ClassLevelTestsResolver,
    },
    runGuardsAndResolvers: "always",
    data: {
      animation: "details",
    },
  },
  {
    path: "housing",
    component: HousingComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      rooms: RoomResolver,
    },
    data: {
      animation: "list",
    },
  },
  {
    path: "school-years",
    component: SchoolYearsComponent,
    runGuardsAndResolvers: "always",

    resolve: {
      school_years: SchoolYearsResolver,
    },
    data: {
      animation: "list",
    },
  },
  // lazy load for times tables
  {
    path: "times-tables",
    loadChildren: () =>
      import("./times-tables/times-tables.module").then(
        (m) => m.TimesTablesModule
      ),
  },
  {
    path: "test-exams",
    loadChildren: () =>
      import("./test-exam/test-exam.module").then((m) => m.TestExamModule),
  },
];

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
    CreateClassCourseComponent,
    UpdateClassCourseComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    TimesTablesModule,
    ClassLevelTestExamModule,
    BuildingModule
  ],
})
export class EstablishmentModule {}
