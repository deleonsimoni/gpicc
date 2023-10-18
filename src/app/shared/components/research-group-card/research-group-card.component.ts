import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Coordenadora } from "@app/shared/types";

@Component({
  selector: "research-group-card-component",
  templateUrl: "./research-group-card.component.html",
  styleUrls: ["./research-group-card.component.scss"]
})
export class ResearchGroupCardComponent {

  @Input() researchGroup: any;
  @Output() delete: EventEmitter<Coordenadora> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

  @Output() participante: EventEmitter<any> = new EventEmitter();
  @Output() pesquisa: EventEmitter<any> = new EventEmitter();
  @Output() dissertacao: EventEmitter<any> = new EventEmitter();
  @Output() artigo: EventEmitter<any> = new EventEmitter();
  @Output() livro: EventEmitter<any> = new EventEmitter();
  @Output() capitulo: EventEmitter<any> = new EventEmitter();
  @Output() parceiros: EventEmitter<any> = new EventEmitter();
  @Output() extensaoEnsino: EventEmitter<any> = new EventEmitter();

}
