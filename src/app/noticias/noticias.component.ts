import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TruncateStringPipe } from '@app/shared/pipes/truncate-string.pipe';
import { ComumService } from '@app/shared/services/comum.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias;
  carregando = false;
  @Input() isLight;

  constructor(
    private comumService: ComumService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.comumService.listNoticia(this.isLight)
      .subscribe((res: any) => {
        this.carregando = false;
        this.noticias = res[0];
        this.noticias?.parceiros.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

      }, err => {
        this.carregando = false;
        this.toastr.success('Ocorreu um erro ao listar as notícias', 'Aguarde');
        console.log(err);
      });
  }

  visualizar(item) {
    item.tipo = 'noticia';
    this.router.navigate(['visualizar'], { state: { data: item } });
  }

}
