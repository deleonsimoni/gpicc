import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-producoes',
  templateUrl: './producoes.component.html',
  styleUrls: ['./producoes.component.scss']
})
export class ProducoesComponent implements OnInit {

  publicacao = 'dissertacao';
  pesquisas = 'Pesquisas Realizadas';
  home;
  pesquisasServer;
  livros;
  teses;
  artigos;
  capitulos;
  extensaoEnsino;
  dissertacoes;
  monografias;
  type = 'gpicc';

  constructor(
    private gpiccService: GpiccService,
    private _sanitizer: DomSanitizer,
    private translate: TranslateService,
    private pipeImage: ImagePathComplement

  ) { }

  ngOnInit(): void {
    //this.getPesquisas('gpicc', 1);
  }

  orderByYearTese(array) {
    array.teses.sort((a, b) => b.dateTesis - a.dateTesis);
  }

  orderByYearCapLivro(array) {
    array.capitulos.sort((a, b) => b.year - a.year);
  }

  sanitizeVideo(link) {
    if (link && link.includes('watch')) {
      link = link.replace('watch?v=', 'embed/');
    }

    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  baixar(url) {
    return url = this.pipeImage.transform(url);
  }

  public getTese(categoryType) {

    this.gpiccService.getTeses(this.type, categoryType)
      .subscribe((res: any) => {

        this.teses = res[0];
        this.orderByYearTese(this.teses);

      }, err => {
        console.log(err);
      });

  }

  public getLivros() {

    this.gpiccService.getLivro(this.type)
      .subscribe((res: any) => {

        this.livros = res[0];


      }, err => {
        console.log(err);
      });

  }

  public getCapLivros() {

    this.gpiccService.getCapitulos(this.type)
      .subscribe((res: any) => {
        if (res.length > 1) {
          this.capitulos = { capitulos: res };
        } else {
          this.capitulos = res[0];
        }
        this.orderByYearCapLivro(this.capitulos);
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
