import {ClassLevel} from '../../models/class-level.model';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Level} from '../../models/level.model';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {first, finalize} from 'rxjs/operators';
import {ClassLevelService} from '../../services/class-level.service';
import {LevelService} from '../../services/level.service';

@Component({
    selector: 'app-edit-class-level',
    templateUrl: './edit-class-level.component.html',
    styleUrls: ['./edit-class-level.component.scss'],
})
export class EditClassLevelComponent implements OnInit {
    @Input('modal') modal: any;
    @Input('item') item: ClassLevel;

    form: FormGroup;
    selectLoading = false;
    createdLoad = false;
    levels: Level[];

    constructor(
        private _fb: FormBuilder,
        private _toastrService: ToastrService,
        private _levelService: LevelService,
        private _translateService: TranslateService,
        private _classLevelService: ClassLevelService,
    ) {
        this.getLevels();
    }

    get name() {
        return this.form.get('name');
    }

    get level_id() {
        return this.form.get('level_id');
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(this.item.name, [Validators.required]),
            level_id: new FormControl(this.item.level_id, [Validators.required]),
        });
    }

    getLevels() {
        this.selectLoading = true;
        this._levelService
            .index<Level>({
                with: ['cycle'],
            })
            .pipe(
                first(),
                finalize(() => (this.selectLoading = false)),
            )
            .subscribe({
                next: (response: any) => {
                    console.log('Levels', response);
                    this.levels = [...response];
                },
            });
    }

    submit(form: any) {
        this.createdLoad = true;
        console.log(form);

        this._classLevelService
            .update(this.item.id, form)
            .pipe(
                first(),
                finalize(() => (this.createdLoad = false)),
            )
            .subscribe({
                next: (response) => {
                    this._toastrService.success(
                        this._translateService.instant(
                            'class_level.update.message.success',
                        ),
                        this._translateService.instant('content.notifications.title'),
                    );
                    response.level = this.levels.find((l) => l.id === response.level_id);
                    this.modal.close(response);
                },
                error: (error) => {
                    this._toastrService.error(
                        this._translateService.instant('class_level.update.message.error'),
                        this._translateService.instant('content.notifications.title'),
                    );
                },
            });
    }
}
