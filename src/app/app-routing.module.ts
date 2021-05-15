import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { EditarProfessorComponent } from './pages/private/professor/editar-professor/editar-professor.component';
import { ListarAulaComponent } from './pages/private/professor/listar-aula/listar-aula.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { EditarAulaComponent } from './pages/private/professor/editar-aula/editar-aula.component';
import { AdicionarCursoComponent } from './pages/private/professor/adicionar-curso/adicionar-curso.component';
import { ListarCursosComponent } from './pages/private/professor/listar-cursos/listar-cursos.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { EditarAlunoComponent } from './pages/private/aluno/editar-aluno/editar-aluno.component';
import { AvaliarCursoComponent } from './pages/private/aluno/avaliar-curso/avaliar-curso.component';
import { ListarAlunosComponent } from './pages/private/professor/listar-alunos/listar-alunos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'editar-professor',
    canActivate: [AuthGuardService],
    component: EditarProfessorComponent,
  },
  {
    path: 'editar-professor/:id',
    canActivate: [AuthGuardService],
    component: EditarProfessorComponent,
  },
  {
    path: 'listar-professor',
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent,
  },
  {
    path: 'listar-aula',
    canActivate: [AuthGuardService],
    component: ListarAulaComponent,
  },
  {
    path: 'editar-aula/:id',
    canActivate: [AuthGuardService],
    component: EditarAulaComponent,
  },
  {
    path: 'adicionar-curso',
    canActivate: [AuthGuardService],
    component: AdicionarCursoComponent,
  },
  {
    path: 'listar-cursos',
    canActivate: [AuthGuardService],
    component: ListarCursosComponent,
  },
  {
    path: 'listar-aluno',
    canActivate: [AuthGuardService],
    component: ListarAlunoComponent,
  },
  {
    path: 'editar-aluno/:id',
    canActivate: [AuthGuardService],
    component: EditarAlunoComponent,
  },
  {
    path: 'avaliar-curso/:id',
    canActivate: [AuthGuardService],
    component: AvaliarCursoComponent,
  },
  {
    path: 'listar-alunos',
    canActivate: [AuthGuardService],
    component: ListarAlunosComponent,
  },
  
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
