import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  /*
  {
    id: 'student',
    title: 'menu.student.title',
    translate: 'menu.student.title',
    type: 'collapsible',
    icon: 'users',
    children: [
      // {
      //   id: 'admission.request',
      //   title: 'menu.admission.request',
      //   translate: 'menu.admission.request',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'pages/admissions',
      // },
      {
        id: 'admission.registration',
        type: 'item',
        title: 'menu.admission.registration',
        icon: 'circle',
        url: 'pages/registrations',
      },

      // {
      //   id: 'admission.fees',
      //   title: 'menu.admission.fees',
      //   translate: 'menu.admission.fees',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'pages/fees',
      // },
      {
        id: 'student.list',
        title: 'menu.student.list',
        translate: 'menu.student.list',
        type: 'item',
        icon: 'circle',
        url: 'pages/students/index',
        queryParams: {
          page: 1,
          per_page: 15,
          order_by: 'last_name',
          order: 'desc',
        },
      },
      // {
      //   id: 'student.card',
      //   type: 'item',
      //   title: 'menu.student.ecard',
      //   icon: 'circle',
      //   url: 'pages/students/ecards',
      // },
      // {
      //   id: 'student.dashboard',
      //   title: 'menu.student.dashboard',
      //   translate: 'menu.student.dashboard',
      //   type: 'item',
      //   icon: 'circle',
      //   url: 'pages/students/dashboard',
      // },
    ],
  },

  // SCHOOL
  {
    id: 'establishments',
    title: 'menu.schools.title',
    translate: 'menu.schools.title',
    type: 'collapsible',
    icon: 'briefcase',
    children: [
      {
        id: 'classrooms',
        title: 'menu.schools.classrooms',
        translate: 'menu.schools.classrooms',
        type: 'item',
        icon: 'circle',
        url: 'pages/classrooms',
        queryParams: {
          page: 1,
          per_page: 10,
          order_by: 'name',
          order: 'desc',
          'with[]': 'building',
        },
      },
      {
        id: 'courses',
        title: 'menu.schools.courses',
        translate: 'menu.schools.courses',
        type: 'item',
        icon: 'circle',
        url: 'pages/courses',
        queryParams: {
          page: 1,
          per_page: 10,
          'with[]': ['semester', 'class_level', 'course', 'professor'],
        },
      },
      {
        id: 'class-levels',
        title: 'menu.schools.class-levels',
        translate: 'menu.schools.class-levels',
        type: 'item',
        icon: 'circle',
        url: 'pages/class-levels',
        queryParams: {
          page: 1,
          per_page: 10,
          'with[]': ['level'],
          'columns[]': ['name', 'id', 'level_id'],
        },
      },
      {
        id: 'housing',
        title: 'menu.schools.housing',
        translate: 'menu.schools.housing',
        type: 'item',
        icon: 'circle',
        url: 'pages/housing',
        queryParams: {
          page: 1,
          per_page: 10,
          'with[]': ['building'],
        },
      },
      
    ],
  },

  {
    id: 'professors',
    title: 'menu.professor.title',
    translate: 'menu.professor.title',
    type: 'collapsible',
    icon: 'twitch',
    children: [
      {
        id: 'professor-list',
        title: 'menu.professor.list',
        translate: 'menu.professor.list',
        type: 'item',
        icon: 'circle',
        url: 'pages/professors/index',
        queryParams: {
          page: 1,
          per_page: 10,
          'with[]': ['school'],
        },
      },
    ],
  },
  {
    id: 'recitations',
    title: 'menu.schools.recitations',
    translate: 'menu.schools.recitations',
    type: 'collapsible',
    icon: 'book-open',
    children: [
      {
        id: 'recitations-list',
        title: 'menu.schools.recitations',
        translate: 'menu.schools.recitations',
        type: 'item',
        icon: 'circle',
        url: 'pages/progressions/index',
      },
    ],
  },*/

  {
    id: "dashboard",
    title: "dashboard.title",
    translate: "dashboard.title",
    type: "item",
    icon: "home",
    url: "dashboard",
  },
  {
    id: "establishment",
    title: "establishment.title",
    translate: "establishment.title",
    type: "collapsible",
    icon: "home",
    children: [
      {
        id: "buildings",
        title: "buildings.title",
        translate: "buildings.title",
        icon: "compass",
        type: "item",
        url: "pages/buildings"
      },
      {
        id: "classrooms",
        title: "classrooms.title",
        translate: "classrooms.title",
        type: "item",
        icon: "book-open",
        url: "pages/classrooms",
        queryParams: {
          page: 1,
          per_page: 10,
          order_by: "name",
          order: "desc",
          "with[]": "building",
        },
      },
      {
        id: 'housing',
        title: 'housing.title',
        translate: 'housing.title',
        type: 'item',
        icon: 'target',
        url: 'pages/housing',
        queryParams: {
          page: 1,
          per_page: 10,
          'with[]': ['building'],
        },
      },
    ]
  },
  
  {
    id: "class",
    title: "class.title",
    translate: "class.title",
    type: "item",
    icon: "briefcase",
    url: "pages/class-levels",
    queryParams: {
      page: 1,
      per_page: 10,
      "with[]": ["level"],
      "columns[]": ["name", "id", "level_id"],
    },
  },
  {
    id: "courses",
    title: "courses.title",
    translate: "courses.title",
    type: "item",
    icon: "book-open",
    url: "pages/courses",
    queryParams: {
      page: 1,
      per_page: 10,
      "with[]": ["semester", "class_level", "course", "professor"],
    },
  },
  {
    id: "professors",
    title: "professors.title",
    translate: "professors.title",
    type: "item",
    icon: "pen-tool",
    url: "pages/professors/index",
    queryParams: {
      page: 1,
      per_page: 10,
      "with[]": ["school"],
    },
  },
  {
    id: "students",
    title: "students.title",
    translate: "students.title",
    type: "item",
    icon: "users",
    url: "pages/students/index",
    queryParams: {
      page: 1,
      per_page: 15,
      order_by: "last_name",
      order: "desc",
    },
  },
  {
    id: 'settings',
    title: 'settings.title',
    translate: 'settings.title',
    type: 'collapsible',
    icon: 'settings',
    children: [
      {
        id: 'settings.archive.title',
        title: 'settings.archive.title',
        translate: 'settings.archive.title',
        type: 'item',
        icon: 'archive',
        url: 'pages/settings/index',
        queryParams: {
         
        },
      },
    ],
  },
];
