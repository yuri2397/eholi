import { AuthGuard } from './../../../auth/helpers/auth.guards'
import { SharedModule } from './../../../shared/shared.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { CoreCommonModule } from '@core/common.module'

import { AuthLoginV1Component } from 'app/main/pages/authentication/auth-login-v1/auth-login-v1.component'

import { AuthRegisterV1Component } from 'app/main/pages/authentication/auth-register-v1/auth-register-v1.component'

import { AuthResetPasswordV1Component } from 'app/main/pages/authentication/auth-reset-password-v1/auth-reset-password-v1.component'
import { AuthForgotPasswordV1Component } from './auth-forgot-password-v1/auth-forgot-password-v1.component'
import { LoginGuard } from 'app/auth/helpers/login.guard'

// routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },
  {
    path: 'authentication/login',
    component: AuthLoginV1Component,
    canActivate: [LoginGuard],
  },
  // {
  //   path: 'authentication/login-v2',
  //   component: AuthLoginV2Component,
  // },
  // {
  //   path: 'authentication/register-v1',
  //   component: AuthRegisterV1Component,
  // },
  // {
  //   path: 'authentication/register-v2',
  //   component: AuthRegisterV2Component,
  // },
  // {
  //   path: 'authentication/reset-password-v1',
  //   component: AuthResetPasswordV1Component,
  // },
  // {
  //   path: 'authentication/reset-password-v2',
  //   component: AuthResetPasswordV2Component,
  // },
  {
    path: 'authentication/forgot-password',
    component: AuthForgotPasswordV1Component,
    canActivate: [LoginGuard],
  },
  // {
  //   path: 'authentication/forgot-password-v2',
  //   component: AuthForgotPasswordV2Component,
  // },
]

@NgModule({
  declarations: [
    AuthLoginV1Component,
    AuthRegisterV1Component,
    AuthForgotPasswordV1Component,
    AuthResetPasswordV1Component,
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
export class AuthenticationModule {}
