import { Curso } from "./curso";

export interface Professor {
  id?: number,
  nome: string,
  email: string
  senha: string
  tipo: number
  cursos?: Curso[]
}
