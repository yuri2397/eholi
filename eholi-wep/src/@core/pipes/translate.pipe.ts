import { TranslateService } from '@ngx-translate/core'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private _translateService: TranslateService) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    return ''
  }
}
