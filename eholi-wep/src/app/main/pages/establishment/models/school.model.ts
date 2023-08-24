import { BaseModel } from 'app/auth/models/base.model'
export class School extends BaseModel {
  name: string;
  phone: string;
  reference: string;
  email: string;
}
