import { Component, OnInit } from '@angular/core';
import { GepedService } from '@app/shared/services/geped.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-geped',
  templateUrl: './geped.component.html',
  styleUrls: ['./geped.component.scss']
})
export class GepedComponent implements OnInit {

  publicacao = 'dissertacao';
  pesquisas = 'Pesquisas Realizadas';
  home;
  pesquisasServer;
  livros;
  teses;
  artigos;
  capitulos;
  extensaoEnsino;

  constructor(
    private gepedService: GepedService,
    private _sanitizer: DomSanitizer,
    private translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.listAll();
    this.translate.onLangChange.subscribe((event) => {
      this.listAll();
    });
  }

  public listAll() {

    this.gepedService.listHome('geped')
      .subscribe((res: any) => {
        this.home = res[0];
        this.ordenarParticipantes();
      }, err => {
        console.log(err);
      });

  }

  ordenarTeses() {
    this.teses.teses.sort(function (a: any, b: any) {
      let date1 = b.dateTesis.split('/');
      let date2 = a.dateTesis.split('/');
      return new Date(date1[2], date1[1] - 1, date1[0]).getTime() - new Date(date2[2], date2[1] - 1, date2[0]).getTime();
    });

  }

  ordenarParticipantes() {

    this.home.participantes.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })

  }

  sanitizeVideo(link) {
    if (link && link.includes('watch')) {
      link = link.replace('watch?v=', 'embed/');
    }

    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public getPesquisas(type, typePesquisa) {

    this.gepedService.listPesquisa(type, typePesquisa)
      .subscribe((res: any) => {
        if (res.length > 1) {
          this.pesquisasServer = { pesquisas: res };
        } else {
          this.pesquisasServer = res[0];
        }

        if (typePesquisa) {
          if (typePesquisa == 1) {
            this.pesquisasServer.pesquisas = this.pesquisasServer.pesquisas.filter(p => p.icPesquisa == 'Realizada')
          } else {
            this.pesquisasServer.pesquisas = this.pesquisasServer.pesquisas.filter(p => p.icPesquisa == 'Em Andamento')
          }
        }

      }, err => {
        console.log(err);
      });

  }

  public ordenarArtigos(array) {

    array.map(artigo => {

      if (artigo.journalArticle.endsWith('.')) {
        artigo.ano = artigo.journalArticle.replace(/.$/, "").slice(-4)
      } else {
        artigo.ano = artigo.journalArticle.slice(-4)
      }

    })

    return array.sort(function (a, b) { return b.ano - a.ano });
  }

  public getExtensaoEnsino(type, typeExtensao) {

    this.gepedService.listExtensaoEnsino(type, typeExtensao)
      .subscribe((res: any) => {
        if (res.length > 1) {
          this.extensaoEnsino = { extensaoEnsino: res };
        } else {
          this.extensaoEnsino = res[0];
        }
      }, err => {
        console.log(err);
      });

  }

  public getArtigos() {

    this.gepedService.getArtigo('geped')
      .subscribe((res: any) => {
        this.artigos = res[0];
        this.artigos.artigos = this.ordenarArtigos(this.artigos.artigos);
      }, err => {
        console.log(err);
      });

  }

  public getLivros() {

    this.gepedService.getLivro('geped')
      .subscribe((res: any) => {
        this.livros = res[0];
      }, err => {
        console.log(err);
      });

  }

  public getCapitulos() {

    this.gepedService.getCapitulos('geped')
      .subscribe((res: any) => {
        this.capitulos = res[0];
      }, err => {
        console.log(err);
      });

  }



  public getTeses() {

    this.gepedService.getTeses('geped')
      .subscribe((res: any) => {
        this.teses = res[0];
        this.ordenarTeses();
      }, err => {
        console.log(err);
      });

  }



  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "../../assets/js/gallery.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.loadScript();
  }

}
