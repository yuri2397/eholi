import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient)
}

@NgModule({
  declarations: [],
  exports: [TranslateModule, ToastrModule],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
    ToastrModule.forRoot(),
  ],
})
export class SharedModule {}
