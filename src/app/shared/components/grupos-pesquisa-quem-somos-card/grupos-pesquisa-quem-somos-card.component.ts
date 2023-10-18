import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-quem-somos-card',
  templateUrl: './grupos-pesquisa-quem-somos-card.component.html',
  styleUrls: ['./grupos-pesquisa-quem-somos-card.component.scss']
})
export class GruposPesquisaQuemSomosCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();


}