import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { EditarProfessorComponent } from './pages/private/professor/editar-professor/editar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { ListarAulaComponent } from './pages/private/professor/listar-aula/listar-aula.component';
import { EditarAulaComponent } from './pages/private/professor/editar-aula/editar-aula.component';
import { AdicionarCursoComponent } from './pages/private/professor/adicionar-curso/adicionar-curso.component';
import { ListarCursosComponent } from './pages/private/professor/listar-cursos/listar-cursos.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { EditarAlunoComponent } from './pages/private/aluno/editar-aluno/editar-aluno.component';
import { AvaliarCursoComponent } from './pages/private/aluno/avaliar-curso/avaliar-curso.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    ListarProfessorComponent,
    ListarAulaComponent,
    EditarAulaComponent,
    AdicionarCursoComponent,
    ListarCursosComponent,
    ListarAlunoComponent,
    EditarAlunoComponent,
    AvaliarCursoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
