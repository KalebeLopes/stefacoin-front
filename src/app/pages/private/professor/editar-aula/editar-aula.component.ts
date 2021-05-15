import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AulaService } from 'src/app/services/aula.service';
import { AuthService } from 'src/app/services/auth.service';
import Aula from 'src/app/models/aula';

@Component({
  selector: 'app-editar-aula',
  templateUrl: './editar-aula.component.html',
  styleUrls: ['./editar-aula.component.css']
})
export class EditarAulaComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    duracao: new FormControl('', Validators.required),
    topicos: new FormControl('', Validators.required),
  });
  aula: Aula = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private aulaService: AulaService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterAula()
  }

  obterAula(){
    let id: number = 0 
    let idCurso:number = 0

    this.activatedRoute.queryParams.subscribe((params) => {
      idCurso = Number(params.idCurso)
    })

    this.activatedRoute.params.subscribe((params) => {
      id = Number(params['id'])
    })

    this.aulaService.obter(id, idCurso).subscribe(
    (result) => {
        console.log(result)
        this.aula = result
        this.updateForm.controls['nome'].setValue(this.aula.nome)
        this.updateForm.controls['duracao'].setValue(this.aula.duracao)
        this.updateForm.controls['topicos'].setValue(this.aula.topicos)
    },
    (err) =>{
      this.toastr.error(err.error.message);
    })
  }

  alterar(){
    this.aula.nome = this.updateForm.controls['nome'].value
    this.aula.duracao = this.updateForm.controls['duracao'].value
    this.aula.topicos = this.updateForm.controls['topicos'].value

    this.aulaService.alterar(this.aula.id, this.aula).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
      },
      (err) => {
        this.toastr.error(err.error.message);
        this.router.navigate(['/listar-aula'])
      }
    )
  }

}
