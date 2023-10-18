import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-artigos-card',
  templateUrl: './grupos-pesquisa-artigos-card.component.html',
  styleUrls: ['./grupos-pesquisa-artigos-card.component.scss']
})
export class GruposPesquisaArtigosCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();


}