import {Student} from './../../student/student.model';
import {SchoolYear} from './school-year.model';
import {BaseModel} from 'app/auth/models/base.model';
import {Level} from './level.model';
import {Course} from '../establishment.model';

export class ClassLevel extends BaseModel {
    name: string;
    level_id: string;
    school_year_id: string;
    school_year: SchoolYear;
    level: Level;
    total_courses: number;
    total_students: number;
    courses: Course[];
    students: Student[];

    times_table?: any;
}
