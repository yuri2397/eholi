import { Professor } from 'app/main/pages/professors/professor'

export interface SchoolHasProfessor {
  id: string
  poste: string
  professor_id: string
  school_id: string
  type: string
  created_at: Date
  updated_at: Date
  professor: Professor
}
