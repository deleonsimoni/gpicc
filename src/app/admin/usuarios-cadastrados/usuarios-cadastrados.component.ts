import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-cadastrados',
  templateUrl: './usuarios-cadastrados.component.html',
  styleUrls: ['./usuarios-cadastrados.component.scss']
})
export class UsuariosCadastradosComponent implements OnInit {

  users;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.authService.retrieveUsers()
      .subscribe((res: any) => {
        this.users = res;
      });

  }

  setAdmin(id) {

    this.authService.setAdmin(id)
      .subscribe((res: any) => {
        this.loadData();
      });
  }

  unsetAdmin(id) {

    this.authService.unsetAdmin(id)
      .subscribe((res: any) => {
        this.loadData();
      });
  }



}
