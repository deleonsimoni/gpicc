import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CominduService } from '@app/comindu.service';
import { AuthService } from '@app/shared/services';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comunidade-comindu',
  templateUrl: './comunidade-comindu.component.html',
  styleUrls: ['./comunidade-comindu.component.scss']
})
export class ComunidadeCominduComponent implements OnInit {

  idComunidade;
  carregando;
  comunidade;
  user;
  postSend;
  chatSend;
  postSelect;
  chats;
  idTimer;

  constructor(
    private cominduService: CominduService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      this.idComunidade = params['id'];
    });
  }

  ngOnInit(): void {
    this.getComunidade();
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });

    this.idTimer = setInterval(() => {
      if (this.postSelect && this.idComunidade) {
        this.getChat(this.postSelect, this.idComunidade);
      }
    }, 50 * 1000);
  }

  ngOnDestroy() {
    if (this.idTimer) {
      clearInterval(this.idTimer);
    }
  }

  public inscrever() {
    this.carregando = true;
    this.cominduService.inscrever(this.comunidade._id)
      .subscribe((res: any) => {
        this.carregando = false;
        this.getComunidade();
      }, err => {
        this.carregando = false;
      });
  }

  public desinscrever() {
    this.carregando = true;
    this.cominduService.desinscrever(this.comunidade._id)
      .subscribe((res: any) => {
        this.carregando = false;
        this.getComunidade();
      }, err => {
        this.carregando = false;
      });
  }

  public getComunidade() {
    this.carregando = true;
    this.cominduService.listComunidadeById(this.idComunidade)
      .subscribe((res: any) => {
        this.carregando = false;
        this.comunidade = res;
        if (this.comunidade.posts) {
          this.ordenarPosts();
        }
      }, err => {
        this.carregando = false;
      });
  }

  ordenarPosts() {

    this.comunidade.posts.sort(function (a, b) {
      if (a.createAt < b.createAt) { return 1; }
      if (a.createAt > b.createAt) { return -1; }
      return 0;
    })

  }

  public getChat(idPost, idComunidade) {
    this.carregando = true;
    this.postSelect = idPost;
    this.cominduService.getChat(idComunidade, idPost)
      .subscribe((res: any) => {
        this.carregando = false;
        this.chats = res[0].posts[0].chats;
        if (this.chats.length == 0) {
          this.toastr.warning('Ainda não há comentários', 'Poxa...');
        }

      }, err => {
        this.carregando = false;
      });
  }

  public blokChat(idPost, idComunidade) {
    this.carregando = true;
    this.cominduService.blokChat(idComunidade, idPost)
      .subscribe((res: any) => {
        this.carregando = false;
        this.getComunidade();

      }, err => {
        this.carregando = false;
      });
  }

  public unblokChat(idPost, idComunidade) {
    this.carregando = true;
    this.cominduService.unblokChat(idComunidade, idPost)
      .subscribe((res: any) => {
        this.carregando = false;
        this.getComunidade();

      }, err => {
        this.carregando = false;
      });
  }

  public deletePost(idPost, idComunidade) {
    if (confirm("Tem certeza que deseja excluir essa postagem?")) {
      this.carregando = true;
      this.cominduService.deletePost(idComunidade, idPost)
        .subscribe((res: any) => {
          this.carregando = false;
          this.getComunidade();
        }, err => {
          this.carregando = false;
        });
    }
  }
  public sendChat() {
    this.carregando = true;
    this.cominduService.postChat(this.chatSend, this.postSelect, this.idComunidade)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Comentário inserido', 'Ok ;)');
        this.chatSend = "";
        this.getChat(this.postSelect, this.idComunidade);
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao cadastrar comentário', 'Atenção: ');

      });
  }

  public deleteChat(idChat) {
    this.carregando = true;
    this.cominduService.deleteChat(idChat, this.postSelect, this.idComunidade)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Comentário excluido com sucesso!', 'Feito');
        this.chatSend = "";
        this.getChat(this.postSelect, this.idComunidade);
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao cadastrar comentário', 'Atenção: ');

      });
  }


  public sendPost() {
    this.carregando = true;
    this.cominduService.sendPost(this.postSend, this.comunidade._id)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Postagem inserida', 'Ok ;)');
        this.postSend = "";
        this.getComunidade();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao cadastrar postagem', 'Atenção: ');

      });
  }

  public isSubscribe() {
    return this.comunidade?.subscribers?.some(el => el.userId._id == this.user._id);
  }


  inativarComunidade() {
    if (confirm("Tem certeza que deseja inativar essa comunidade?")) {
      this.cominduService.inativarComunidade(this.comunidade._id)
        .subscribe((res: any) => {
          this.carregando = false;
          this.getComunidade();
        }, err => {
          this.carregando = false;
        });
    }
  }


  deletarComunidade() {
    if (confirm("Tem certeza que deseja excluir permanentemente essa comunidade?")) {
      this.cominduService.deletarComunidade(this.comunidade._id)
        .subscribe((res: any) => {
          this.toastr.success("Comunidade excluida", "Sucesso");
          this.router.navigate(['home-indu']);
        }, err => {
          this.carregando = false;
        });
    }
  }

  ativarComunidade() {
    this.cominduService.ativarComunidade(this.comunidade._id)
      .subscribe((res: any) => {
        this.carregando = false;
        this.getComunidade();
      }, err => {
        this.carregando = false;
      });
  }
















  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,

    width: '800px',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    sanitize: true,
    toolbarHiddenButtons: [
      ['undo', 'redo', 'heading'],
      ['insertVideo', 'insertImage', 'toggleEditorMode', 'fontSize']
    ]
  };

}
