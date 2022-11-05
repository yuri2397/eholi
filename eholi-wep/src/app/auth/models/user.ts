import { BaseModel } from './base.model'
import { Role as ApiRole, Permission } from './data.model'
import { Role } from './role'

export class User extends BaseModel {
  email: string
  password: string
  firstName: string
  lastName: string
  avatar: string
  role?: Role
  token?: string
  owner?: any
  owner_id?: string
  owner_type?: string
  roles?: ApiRole[]
  permissions?: Permission[]
}
