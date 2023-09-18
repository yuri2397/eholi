import { CoreMenu } from '@core/types'

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  // {
  //   id: 'dashboard',
  //   title: 'menu.dashboard.home',
  //   translate: 'menu.dashboard.home',
  //   type: 'collapsible',
  //   // role: ['Admin'], //? To hide collapsible based on user role
  //   icon: 'home',
  //   children: [
  //     {
  //       id: 'analytics',
  //       title: 'menu.dashboard.analytics',
  //       translate: 'menu.dashboard.analytics',
  //       type: 'item',
  //       // role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
  //       icon: 'circle',
  //       url: 'dashboard/analytics',
  //     },
  //     {
  //       // If role is not assigned will be display to all
  //       id: 'ecommerce',
  //       title: 'menu.dashboard.ecommerce',
  //       translate: 'menu.dashboard.ecommerce',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'dashboard/ecommerce',
  //     },
  //   ],
  // },

  // ADMINISTRATIONS
  // {
  //   id: 'schools',
  //   title: 'menu.administration.title',
  //   translate: 'menu.administration.title',
  //   type: 'collapsible',
  //   icon: 'paperclip',
  //   children: [
  //     {
  //       id: 'parent',
  //       title: 'menu.administration.parent',
  //       translate: 'menu.administration.parent',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'pages/tutors/index',
  //       queryParams: {
  //         per_page: 15,
  //         page: 1,
  //       },
  //     },
  //     {
  //       id: 'personal',
  //       title: 'menu.administration.personal',
  //       translate: 'menu.administration.personal',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'pages/personals',
  //     },
  //     {
  //       id: 'attendance',
  //       title: 'menu.administration.attendance',
  //       translate: 'menu.administration.attendance',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'pages/attendances',
  //     },
  //   ],
  // },

  // STUDENT MANAGEMENT
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
    type: 'item',
    icon: 'book-open',
    url: 'pages/progressions/index',
  },
]
