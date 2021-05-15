import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css']
})
export class ListarAlunosComponent implements OnInit {
  alunos: Aluno[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.allAlunos()
  }

  allAlunos(){
    this.alunoService.listar().subscribe(
      (result) => {
        this.alunos = result
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  excluir(id: number){
    this.alunoService.excluir(id).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

}
