import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Aluno } from '../models/aluno';
import { Avaliacao } from '../models/avaliacao';

const URL = 'http://localhost:3000/stefanini/aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(URL)
  }

  obter(filtro: Partial<Aluno>): Observable<Aluno> { 
    return this.httpClient.get<Aluno>(`${URL}/${filtro.id}`);
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aluno);
  }

  alterar(id: number, aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/${id}`, aluno);
  }

  avaliarCurso(avaliacao: Avaliacao): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/avaliacao`, avaliacao);
  }

  matricular(id: number, curso: any): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/curso/${id}`, curso);
  }

  excluir(id: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}`);
  }
}
