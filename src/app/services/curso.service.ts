import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Curso } from '../models/curso';

const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private httpClient: HttpClient) {}

  listar(filtro: Partial<Curso>): Observable<Curso[]>{
    console.log('aq ', filtro.idProfessor)
    let params = {}
    if(filtro.idProfessor) {
      params = new HttpParams().set("idProfessor", filtro.idProfessor.toString())
    }
    return this.httpClient.get<Curso[]>(URL, {
      params: params
    });
  }

  obter() {}

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  alterar() {}

  excluir(id: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/${id}`);
  }
}
