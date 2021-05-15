import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import Aula from '../models/aula';

const URL = 'http://localhost:3000/stefanini/aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  constructor(private httpClient: HttpClient) {}

  listar(idCurso: number): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(`${URL}?idCurso=${idCurso}`);
  }

  obter(id: number, idCurso: number): Observable<Aula> {  
    return this.httpClient.get<Aula>(`${URL}/${id}?idCurso=${idCurso}`);
  }

  // incluir(curso: Curso): Observable<Mensagem> {
  //   return this.httpClient.post<Mensagem>(URL, curso);
  // }

  alterar(id: number, Aula: Aula): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/${id}`, Aula);
  }

  excluir(id: number, idCurso: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}?idCurso=${idCurso}`);
  }
}
