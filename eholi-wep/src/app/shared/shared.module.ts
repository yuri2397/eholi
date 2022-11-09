import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoreCommonModule } from '@core/common.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TablesModule } from 'app/main/tables/tables.module'
import {
  SwiperConfigInterface,
  SwiperModule,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper'
import { CoreSidebarModule } from '@core/components'
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module'
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module'
import { NouisliderModule } from 'ng2-nouislider'
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient)
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true,
}

@NgModule({
  declarations: [],
  exports: [
    TranslateModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ContentHeaderModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CoreSidebarModule,
  ],
  imports: [
    CommonModule,
    CardSnippetModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
    ToastrModule.forRoot(),
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    CoreSidebarModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class SharedModule {}
