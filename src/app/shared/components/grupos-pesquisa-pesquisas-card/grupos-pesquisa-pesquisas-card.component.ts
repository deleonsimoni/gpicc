
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-pesquisas-card',
  templateUrl: './grupos-pesquisa-pesquisas-card.component.html',
  styleUrls: ['./grupos-pesquisa-pesquisas-card.component.scss']
})
export class GruposPesquisaPesquisasCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

}
