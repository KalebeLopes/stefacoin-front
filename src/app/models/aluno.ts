import { Curso } from "./curso";

export interface Aluno {
  id?: number,
  nome: string,
  formacao: string
  idade: number
  email: string
  senha: string
  tipo: number
  cursos?: Curso[]
}
