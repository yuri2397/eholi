import {ClassLevel} from './class-level.model';

export interface TimesTable {
    id?:             string;
    class_level_id?: string;
    school_year_id?: string;
    school_year?:    any;
    created_at?:     Date;
    updated_at?:     Date;
    rows?:           any[];
    class_level?:    ClassLevel;
}
