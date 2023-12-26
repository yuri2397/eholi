import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractService} from 'app/shared/abstract.service';

@Injectable({
    providedIn: 'root',
})
export class TimesTablesService extends AbstractService {
    constructor(private _ch: HttpClient) {
        super('times-tables', _ch);
    }
}
