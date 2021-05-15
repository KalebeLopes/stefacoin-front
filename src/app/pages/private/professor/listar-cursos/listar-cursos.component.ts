import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  cursos: Curso[] = []
  userJson = null

  constructor(
    private cursoService: CursoService,
    private alunoService: AlunoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    this.userJson = (JSON.parse(user))
    this.allCursos()
  }

  allCursos(){
    this.cursoService.listar({}).subscribe(
      (result) => {
        console.log(result)
        this.cursos = result 
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  matricular(id: number) {
    this.alunoService.matricular(id, this.cursos).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
        this.router.navigate(['/listar-aluno']);

      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

}
