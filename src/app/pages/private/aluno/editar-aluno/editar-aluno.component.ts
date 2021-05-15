import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    idade: new FormControl('', Validators.required),
    formacao: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    novaSenha: new FormControl('', Validators.required),
  });

  aluno: Aluno = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunoService: AlunoService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterAluno()
  }

  obterAluno(){
    let id: number = 0 
    this.activatedRoute.params.subscribe((params) => {
      id = Number(params['id'])
    })

    this.alunoService.obter({id: id}).subscribe(
      (result) => {
        this.aluno = result
        this.updateForm.controls['nome'].setValue(this.aluno.nome)
        this.updateForm.controls['idade'].setValue(this.aluno.idade)
        this.updateForm.controls['formacao'].setValue(this.aluno.formacao)
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  alterar(){
    console.log(this.updateForm.value)
    const alunoUpdated: Aluno = this.updateForm.value
    this.alunoService.alterar(this.aluno.id, alunoUpdated).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
        this.authService.logout()
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

}
