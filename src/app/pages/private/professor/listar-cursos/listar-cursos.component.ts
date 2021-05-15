import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  cursos: Curso[] = []

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

}
