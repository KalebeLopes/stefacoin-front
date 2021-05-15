import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avaliar-curso',
  templateUrl: './avaliar-curso.component.html',
  styleUrls: ['./avaliar-curso.component.css'],
})
export class AvaliarCursoComponent implements OnInit {
  avaliarForm: FormGroup = new FormGroup({
    nota: new FormControl('', Validators.required),
  });
  avaliacao: Avaliacao = null
  idCurso = null
  userJson = null

  constructor(
    private alunoService: AlunoService, 
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.idCurso = params['id'])
  }

  avaliar() {
    const user = localStorage.getItem('user')
    this.userJson = (JSON.parse(user))

    this.avaliacao = {
      idAluno: Number(this.userJson.id),
      idCurso: Number(this.idCurso),
      nota: Number(this.avaliarForm.controls['nota'].value)
    }

    console.log(this.avaliacao)

    this.alunoService.avaliarCurso(this.avaliacao).subscribe(
      (res) => {
        this.toastr.success(res.mensagem);
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }
}
