import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CominduService } from '@app/comindu.service';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscritos-card',
  templateUrl: './inscritos-card.component.html',
  styleUrls: ['./inscritos-card.component.scss']
})
export class InscritosCardComponent {

  @Input() subscribed: any;
  @Output() selected = new EventEmitter();

  newPassword;

  constructor(
    private cominduService: CominduService,
    private pipeImage: ImagePathComplement,
    private toastService: ToastrService,
  ) { }

  public selectUser(user): void {
    this.selected.emit(user);
  }

  public confirmComprovante(user) {
    this.cominduService.confirmComprovante(user._id)
      .subscribe(() => {
        user.icComprovanteValido = true;
      }, err => {
        console.log(err);
      });
  }

  public negarComprovante(user) {
    this.cominduService.negarComprovante(user._id)
      .subscribe(() => {
        user.icComprovanteValido = false;
      }, err => {
        console.log(err);
      });
  }

  baixarComprovante(url) {
    return url = this.pipeImage.transform(url);
  }

  resetSenha(user) {
    if (this.newPassword && this.newPassword.length > 5) {
      this.cominduService.resetPassword(user._id, this.newPassword)
        .subscribe(() => {
          this.toastService.success("A senha do usuário foi alterada", "Sucesso");
        }, err => {
          console.log(err);
        });
    } else {
      this.toastService.warning("A senha deve ter no minimo 6 caracteres", "Atenção");
    }

  }
}
