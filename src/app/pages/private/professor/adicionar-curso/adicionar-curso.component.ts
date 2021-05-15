import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Aula from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-adicionar-curso',
  templateUrl: './adicionar-curso.component.html',
  styleUrls: ['./adicionar-curso.component.css']
})
export class AdicionarCursoComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    nomeAula: new FormControl('', Validators.required),
    duracao: new FormControl('', Validators.required),
    topicos: new FormControl('', Validators.required),
  });
  curso: Curso = null
  aula: Aula = null
  aulas: Aula[] = []
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  adicionar(){
    let user = localStorage.getItem('user')
    const {id} = (JSON.parse(user))
    console.log(this.addForm.value)

    this.aula = {
      nome: this.addForm.controls['nomeAula'].value,
      duracao: this.addForm.controls['duracao'].value,
      topicos: this.addForm.controls['topicos'].value.split(',')
    }
    
    this.curso = {
      nome: this.addForm.controls['nome'].value,
      descricao: this.addForm.controls['descricao'].value,
      idProfessor: id,
      aulas: [this.aula]
    }

    console.log(this.curso)

    this.cursoService.incluir(this.curso).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
        this.router.navigate(['/listar-professor'])
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }
}
