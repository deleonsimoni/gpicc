import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-capitulos-card',
  templateUrl: './grupos-pesquisa-capitulos-card.component.html',
  styleUrls: ['./grupos-pesquisa-capitulos-card.component.scss']
})
export class GruposPesquisaCapitulosCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();


}