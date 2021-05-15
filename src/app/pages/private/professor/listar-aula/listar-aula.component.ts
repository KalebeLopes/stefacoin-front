import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Aula from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-listar-aula',
  templateUrl: './listar-aula.component.html',
  styleUrls: ['./listar-aula.component.css']
})
export class ListarAulaComponent implements OnInit {

  aulas: Aula[] = []
  topicos: {}
  userJson = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private aulaService: AulaService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.allAulas()
    const user = localStorage.getItem('user')
    this.userJson = (JSON.parse(user))
  }

  allAulas(){
    const idCurso = this.getIdParam()
    console.log(idCurso)
    this.aulaService.listar(Number(idCurso)).subscribe(
      (result) => {
        console.log(result)
        if(result.length > 0)
          this.aulas = result

        this.aulas.forEach((obj) => { 
          console.log(obj)
        }) 
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  excluir(id: number){
    const idCurso = this.getIdParam()
    console.log(id)
    this.aulaService.excluir(id, Number(idCurso)).subscribe(
      (result) => {
        this.toastr.success(result.mensagem);
        // this.router.url
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    )
  }

  getIdParam(): {} {
    let idCurso:number = 0
    this.activatedRoute.queryParams.subscribe((params) => {
      idCurso = Number(params.idCurso)
    })
    return idCurso
  }

}
