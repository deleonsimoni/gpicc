import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  public loginForm: FormGroup;
  changePassword;
  novaSenha;
  novaSenhaRepeat;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.loginForm = this.builder.group({
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  changePasswordAPI() {

    if (this.novaSenhaRepeat && this.novaSenhaRepeat > 5
      && this.novaSenha && this.novaSenha > 5
      && this.novaSenha == this.novaSenhaRepeat) {
      this.authService.changePassword(this.novaSenha)
        .subscribe((res: any) => {
          this.toastr.success('Bom te ver de novo', 'Bem-vindo :)');
          this.router.navigateByUrl('/');
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Erro ao alterar senha', 'Erro: ');
          }
        });
    } else {
      this.toastr.warning("As senhas devem coincidir e possuir no minimo 6 caracteres", "Atenção");
    }

  }

  login(): void {

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe((res: any) => {
          if (res.icAdminChangePassword) {
            this.changePassword = true;

          } else {
            this.toastr.success('Bom te ver de novo', 'Bem-vindo :)');
            this.router.navigateByUrl('/');
          }
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
        });
    }
  }

  get validate() {
    return this.loginForm.controls;
  }

}
