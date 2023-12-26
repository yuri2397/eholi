import {ClassLevel} from './class-level.model';
import {ClassRoom} from './class-room.model';
import {ClassLevelCourse} from './class-level-course.model';
import { SchoolHasProfessor } from 'app/shared/models/school_has_professor.model';

export interface TimesTable {
    id?:             string;
    class_level_id?: string;
    school_year_id?: string;
    school_year?:    any;
    created_at?:     Date;
    updated_at?:     Date;
    rows?:           TimesTableRows[];
    class_level?:    ClassLevel;
}


export interface TimesTableRows {
    id: string;
    start: Date;
    end: Date;
    all_day: boolean;
    is_repeated: boolean;
    times_table_id: string;
    times_table: TimesTable;
    class_room_id: string;
    class_room: ClassRoom;
    class_level_has_course_id: string;
    class_level_has_course: ClassLevelCourse;
    school_has_professor_id: string;
    school_has_professor: SchoolHasProfessor;
    created_at: Date;
    updated_at: Date;
}
