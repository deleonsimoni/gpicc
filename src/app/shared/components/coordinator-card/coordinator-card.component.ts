import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Coordenadora } from "@app/shared/types";

@Component({
  selector: "coordinator-card-component",
  templateUrl: "./coordinator-card.component.html",
  styleUrls: ["./coordinator-card.component.scss"]
})
export class CoordinatorCardComponent {

  @Input() coordinator: any;
  @Output() delete: EventEmitter<Coordenadora> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

}
