import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-editar-professor',
  templateUrl: './editar-professor.component.html',
  styleUrls: ['./editar-professor.component.css']
})
export class EditarProfessorComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    novaSenha: new FormControl('', Validators.required),
  });
  professor: Professor = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private professorService: ProfessorService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterProfessor()
  }

  obterProfessor(){
    let id: number = 0 
    this.activatedRoute.params.subscribe((params) => {
      id = Number(params['id'])
    })

    this.professorService.obter({id: id}).subscribe(
      (result) => {
        console.log(result)
        this.professor = result
        this.updateForm.controls['nome'].setValue(this.professor.nome)
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  alterar(){
    console.log(this.updateForm.value)
    const professorUpdated: Professor = this.updateForm.value
    this.professorService.alterar(this.professor.id, professorUpdated).subscribe(
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
