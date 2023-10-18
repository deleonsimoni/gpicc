import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-livros-card',
  templateUrl: './grupos-pesquisa-livros-card.component.html',
  styleUrls: ['./grupos-pesquisa-livros-card.component.scss']
})
export class GruposPesquisaLivrosCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();


}
