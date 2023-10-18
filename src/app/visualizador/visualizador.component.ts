import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.scss']
})
export class VisualizadorComponent implements OnInit {

  item;

  constructor(
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.item = this.router.getCurrentNavigation().extras.state.data;
    } else {
      this.router.navigate(['noticias']);
    }
  }

  voltar() {
    if (this.item.tipo == 'noticia') {
      this.router.navigate(['noticias']);
    } else {
      this.router.navigate(['eventos']);
    }

  }

  ngOnInit(): void {
  }

}
