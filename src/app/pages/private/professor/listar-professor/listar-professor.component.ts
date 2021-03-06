import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  professor: Professor = null

  constructor(
    private professorService: ProfessorService,
    private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.allCursos()
  }

  allCursos(){
    const user = localStorage.getItem('user')
    const userJson = (JSON.parse(user))
    this.professorService.obter({id: userJson.id}).subscribe(
      (result) => {
        console.log(result)
        this.professor = result
        // this.cursos = result.cursos
        this.professor.cursos.forEach((obj) => { 
          console.log(obj)
        }) 
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  excluir(id: number) {
    console.log(id)
    this.cursoService.excluir(id).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
        this.router.navigate(['listar-professor'])
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  adicionarCurso(id: number) {
    console.log(id)
    this.router.navigate(['adicionar-curso'])
  }
}