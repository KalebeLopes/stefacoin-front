import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

enum CheckBoxType { Aluno, Professor, none };

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;
  aluno: Aluno = null
  professor: Professor = null

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    formacao: new FormControl('', Validators.required),
    idade: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private professorService: ProfessorService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  selectCheckBox(targetType: CheckBoxType) {
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.none;
      return;
    }

    this.currentlyChecked = targetType;
    console.log(this.currentlyChecked)
  }

  cadastrar() {
    if(this.currentlyChecked === 1){
      this.professor = {
        nome: this.cadastroForm.get('nome')?.value,
        email: this.cadastroForm.get('email')?.value,
        senha: this.cadastroForm.get('senha')?.value,
        tipo: 1
      };

      this.professorService.incluir(this.professor).subscribe(
        (msg) => {
          console.log(msg.code)
          console.log(msg.data)
          console.log(msg.mensagem)
          if(msg.code === 200)
            this.router.navigate(['/login']);
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      )
    } 

    else if (this.currentlyChecked === 0){
      this.aluno = {
        nome: this.cadastroForm.get('nome')?.value,
        formacao: this.cadastroForm.get('formacao')?.value,
        idade: this.cadastroForm.get('idade')?.value,
        email: this.cadastroForm.get('email')?.value,
        senha: this.cadastroForm.get('senha')?.value,
        tipo: 2
      };

      this.alunoService.incluir(this.aluno).subscribe(
        (msg) => {
          console.log(msg.code)
          console.log(msg.data)
          console.log(msg.mensagem)
          this.toastr.success(msg.mensagem);
          if(msg.code === 200)
            this.router.navigate(['/login']);
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      )
    }   
  }
}