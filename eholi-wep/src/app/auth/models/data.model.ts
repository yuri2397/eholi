export interface Param {
  [param: string]: string | number | boolean | (string | number | boolean)[]
}

export interface Role {
  guard_name: string
  name: string
}

export interface Permission {
  guard_name: string
  name: string
}
