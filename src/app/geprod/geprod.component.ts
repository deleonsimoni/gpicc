import { Component, OnInit } from '@angular/core';
import { GepedService } from '@app/shared/services/geped.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-geprod',
  templateUrl: './geprod.component.html',
  styleUrls: ['./geprod.component.scss']
})
export class GeprodComponent implements OnInit {

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
    private _sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  public listAll() {

    this.gepedService.listHome('geprod')
      .subscribe((res: any) => {
        this.home = res[0];
        this.ordenarParticipantes();
      }, err => {
        console.log(err);
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
    if (link.includes('watch')) {
      link = link.replace('watch?v=', 'embed/');
    }

    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public getPesquisas(type, typePesquisa) {

    this.gepedService.listPesquisa(type, typePesquisa)
      .subscribe((res: any) => {
        this.pesquisasServer = res[0];
      }, err => {
        console.log(err);
      });

  }

  public getExtensaoEnsino(type, typeExtensao) {

    this.gepedService.listExtensaoEnsino(type, typeExtensao)
      .subscribe((res: any) => {
        this.extensaoEnsino = res[0];
      }, err => {
        console.log(err);
      });

  }

  public getArtigos() {

    this.gepedService.getArtigo('geprod')
      .subscribe((res: any) => {
        this.artigos = res[0];
      }, err => {
        console.log(err);
      });

  }

  public getLivros() {

    this.gepedService.getLivro('geprod')
      .subscribe((res: any) => {
        this.livros = res[0];
      }, err => {
        console.log(err);
      });

  }

  public getCapitulos() {

    this.gepedService.getCapitulos('geprod')
      .subscribe((res: any) => {
        this.capitulos = res[0];
      }, err => {
        console.log(err);
      });

  }



  public getTeses() {

    this.gepedService.getTeses('geprod')
      .subscribe((res: any) => {
        this.teses = res[0];
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
