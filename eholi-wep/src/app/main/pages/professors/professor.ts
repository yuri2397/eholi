import {BaseModel} from 'app/auth/models/base.model';
import {Media} from 'app/shared/models/media.model';

export class Professor extends BaseModel {
    first_name: string;
    last_name: string;
    email?: string;
    telephone?: string;
    cni?: string;
    reference: string;
    sexe: string;
    adress?: string;
    status: boolean;
    last_degre?: string;
    poste?: string;
    type?: string;
    media?: Media[];
}
