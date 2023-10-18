import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HistoricoComponent } from './historico/historico.component';
import { LinhasPesquisaComponent } from './linhas-pesquisa/linhas-pesquisa.component';
import { EventosComponent } from './eventos/eventos.component';
import { ObrasPublicadasComponent } from './obras-publicadas/obras-publicadas.component';
import { GruposComponent } from './grupos/grupos.component';
import { GecultComponent } from './gecult/gecult.component';
import { GedocComponent } from './gedoc/gedoc.component';
import { GeprodComponent } from './geprod/geprod.component';
import { GepematComponent } from './gepemat/gepemat.component';
import { GepedComponent } from './geped/geped.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { HomeCominduComponent } from './comindu/home-comindu/home-comindu.component';
import { ComunidadeCominduComponent } from './comindu/comunidade-comindu/comunidade-comindu.component';
import { MeuCominduComponent } from './comindu/meu-comindu/meu-comindu.component';
import { InscritosComponent } from './comindu/admin/inscritos/inscritos.component';
import { ChatCominduComponent } from './comindu/chat-comindu/chat-comindu.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'linhas-pesquisa',
    component: LinhasPesquisaComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'eventos',
    component: EventosComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'obras-publicadas',
    component: ObrasPublicadasComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'grupo/:grupo',
    component: GruposComponent,
    /*canActivate: [AuthGuard],*/
  },

  {
    path: 'geped',
    component: GepedComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'gepemat',
    component: GepematComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'geprod',
    component: GeprodComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'gedoc',
    component: GedocComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'gecult',
    component: GecultComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'visualizar',
    component: VisualizadorComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'home-indu',
    component: HomeCominduComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'meu-indu',
    component: MeuCominduComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'com-indu/admin/usuarios',
    component: InscritosComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'com-indu/chat',
    component: ChatCominduComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'comunidade-indu/:id',
    component: ComunidadeCominduComponent,
    /*canActivate: [AuthGuard],*/
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
