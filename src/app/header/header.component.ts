import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/shared/interfaces';

import { AuthService } from '@app/shared/services';
import { ComumService } from '@app/shared/services/comum.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() user: User | null = null;

  selectedCountryCode = 'br';
  countryCodes = ['us', 'br'];
  navbar;

  constructor(
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    public comumService: ComumService,
    private elementRef: ElementRef

  ) {

  }

  public closeMenu() {
    const element = this.elementRef.nativeElement.querySelector('.mobile-nav-toggle');

    // Verifica se o elemento foi encontrado
    if (element) {
      // Simula o clique no elemento
      element.click();
    } else {
      console.error('Elemento não encontrado');
    }
  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "../../assets/js/leped2.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.loadScript();
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }

  changeSelectedCountryCode(value: string): void {

    this.selectedCountryCode = value;
    this.comumService.localeVar = value;
    this.translate.use(value);

  }
}
