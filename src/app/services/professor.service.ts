import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  // listar(filtro: Partial<Professor>): Observable<Professor[]> {
  //   return this.httpClient.get<Professor[]>(URL, {
  //     params: filtro,
  //   });
  // }

  obter(filtro: Partial<Professor>): Observable<Professor> {  // listar um professor e seus cursos
    // let params = new HttpParams().set("idProfessor", filtro.id.toString())
    return this.httpClient.get<Professor>(`${URL}/${filtro.id}`);
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar(id: number, professor: Professor): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/${id}`, professor);
  }

  excluir() {}
}
