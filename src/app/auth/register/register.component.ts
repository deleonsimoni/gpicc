import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@app/shared/services';
import { ModalTermoComponent } from '@app/dialog/modal-termo/modal-termo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup;
  public carregando = false;
  comprovanteProfessorFile: File | null = null;


  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
    private rota: Router,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.createForm();
  }


  ngOnInit(): void {

  }

  private createForm(): void {
    this.registerForm = this.builder.group({
      fullname: [null, [Validators.required]],
      socialname: [null, []],
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      repeatEmail: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfPassword: [null, [Validators.required, Validators.minLength(6)]],
      dateBirth: [null, [Validators.required]],

      address: this.builder.group({
        street: [null, [Validators.required]],
        num: [null, [Validators.required]],
        complement: [null],
        zip: [null, [Validators.required]],
        city: [null, [Validators.required]],
        district: [null, [Validators.required]],
        country: [null, [Validators.required]],
        state: [null, [Validators.required]]
      }),
      phones: this.builder.group({
        telephone: [null],
        cellphone: [null, [Validators.required]],
      }),
      icAcceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  handleFileInput(files: FileList) {
    this.comprovanteProfessorFile = files.item(0);
  }


  register(): void {

    const form = this.registerForm.value;

    if (form.password != form.cfPassword) {
      this.toastr.error('Senhas divergentes.', 'Atenção: ');
      return;
    }

    if (this.registerForm.get('phones').get('cellphone').errors) {
      this.toastr.error('Número de celular inválido.', 'Atenção: ');
      return;
    }

    if (this.registerForm.get('address').get('zip').errors) {
      this.toastr.error('CEP inválido.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.icAcceptTerms) {
      this.toastr.error('É necessário aceitar os termos para prosseguir.', 'Atenção: ');
      return;
    }

    if (this.registerForm.value.repeatEmail != this.registerForm.value.email) {
      this.toastr.error('Verifique o campo email e confirmação de email.', 'Atenção: ');
      return;
    }

    if (!this.registerForm.value.fullname) {
      this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
      return;
    }

    if (!this.comprovanteProfessorFile) {
      this.toastr.error('Envie o comprovante da categoria de professor', 'Atenção: ');
      return;
    }

    if (this.registerForm.valid && form != null) {

      this.carregando = true;
      this.registerForm.value.email = this.registerForm.value.email.toLowerCase().trim();
      this.registerForm.removeControl('cf-password');

      this.authService
        .register(form, this.comprovanteProfessorFile)
        .subscribe((res: any) => {
          this.toastr.success('Cadastro realizado com sucesso.', 'Bem-vindo');
          this.router.navigate(['']);
        }, err => {
          this.carregando = false;
          if (err.status === 500) {
            if (err.error.message.match('email')) {
              this.toastr.error('Email já registrado.', 'Erro: ');
            }
          }
        });
    } else {
      this.toastr.error('Verifique os campos do formulário para checar o correto preenchimento.', 'Erro: ');
    }


  }


  public openRules(): void {
    const dialogRef = this.dialog.open(ModalTermoComponent, {
      data: {},
    });
  }

  get validate() {
    return this.registerForm.controls;
  }

  get phones() {
    return this.registerForm.get('phones')['controls'];
  }

  get address() {
    return this.registerForm.get('address')['controls'];
  }













}
