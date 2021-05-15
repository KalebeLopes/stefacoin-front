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

  // #pegabandeira
  // listar(filtro: Partial<Professor>): Observable<Professor[]> {
  //   return this.httpClient.get<Professor[]>(URL, {
  //     params: filtro,
  //   });
  // }

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

  excluir() {}
}
