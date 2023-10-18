import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) { }

  nomeMenu;
  user;
  menu;

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.menu = [
        { name: 'QUEM SOMOS', path: '/admin/quem-somos', show: this.user?.isAdmin },
        { name: 'COORDENADORAS', path: '/admin/coordenadoras', show: this.user?.isAdmin },
        { name: 'EVENTOS', path: '/admin/eventos', show: this.user?.isAdmin },
        { name: 'GALERIA', path: '/admin/galeria', show: this.user?.isAdmin },
        { name: 'NOTÍCIAS', path: '/admin/noticias', show: this.user?.isAdmin },
        {
          name: 'GRUPOS DE PESQUISA', path: '/admin/grupos-pesquisa', show: this.user?.isGeped || this.user?.isGeprod
            || this.user?.isGedoc
        },
      ];
    });

  }



}
