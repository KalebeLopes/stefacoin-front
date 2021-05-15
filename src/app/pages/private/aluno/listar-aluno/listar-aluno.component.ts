import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CursoService } from 'src/app/services/curso.service';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthGuardService } from 'src/app/guards/auth-guard.service'

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})

export class ListarAlunoComponent implements OnInit {

  aluno: Aluno = null
  // cursos: Curso[] = []

  constructor(
    private alunoService: AlunoService,
    private cursoService: CursoService,
    private router: Router,
    private toastr: ToastrService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.authGuardService.canActivate
    this.allCursos()
  }

  allCursos(){
    const user = localStorage.getItem('user')
    const userJson = (JSON.parse(user))
    this.alunoService.obter({id: userJson.id}).subscribe(
      (result) => {
        this.aluno = result
        // this.cu
        // console.log(this.aluno.cursos)
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  avaliar(id: number) {
    this.router.navigate(['avaliar-curso', id])
    console.log(id)
  }

  adicionarCurso(id: number) {
    console.log(id)
    this.router.navigate(['adicionar-curso'])
  }
}