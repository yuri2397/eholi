import { ProfessorsModule } from './professors/professors.module'
import { SchoolModule } from './school/school.module'
import { EstablishmentModule } from './establishment/establishment.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'

import { CoreCommonModule } from '@core/common.module'
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module'

import { KbModule } from './kb/kb.module'
import { Ng2FlatpickrModule } from 'ng2-flatpickr'
import { ProfileModule } from './profile/profile.module'
import { PricingModule } from './pricing/pricing.module'
import { FaqModule } from 'app/main/pages/faq/faq.module'
import { AccountSettingsModule } from './account-settings/account-settings.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module'
import { StudentModule } from './student/student.module'
import { RecitationModule } from './recitation/recitation.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    AuthenticationModule,
    MiscellaneousModule,
    Ng2FlatpickrModule,
    PricingModule,
    ProfileModule,
    KbModule,
    FaqModule,
    AccountSettingsModule,

    // Holi Modules
    StudentModule,
    EstablishmentModule,
    SchoolModule,
    ProfessorsModule,
    RecitationModule
  ],

  providers: [],
})
export class PagesModule {}
