import { BaseModel } from 'app/auth/models/base.model'
export class SchoolYear extends BaseModel {
    start_end: string;
    start_at: Date;
    end_at: Date;
    school_id: number;
    school: any;
    status: string;
}
