import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';

import { User } from '@app/shared/interfaces';

import { TokenStorage } from './token.storage';
import { LepedService } from '../leped.service';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private lepedService: LepedService) { }

  login(form: any): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/login', form)
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  changePassword(senha: any) {
    return this.http.post('/api/auth/changePassword', { senha: senha });
  }

  register(form: any, comprovante: any): Observable<User> {


    const formData: FormData = new FormData();
    formData.append('comprovante', comprovante, comprovante.name);
    formData.append('formulario', JSON.stringify(form));

    return this.http
      .post<AuthResponse>('/api/auth/register', formData)
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  updateBio(file: File, form: any) {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    formData.append('formulario', JSON.stringify(form));
    return this.http.put(`/api/user/updateBio`, formData);
  }

  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin');
      user.isGeped = user.roles.includes('geped');
      user.isGeprod = user.roles.includes('geprod');
      user.isGedoc = user.roles.includes('gedoc');
    }

    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User | null> {
    return this.http.get<AuthResponse>('/api/auth/me').pipe(
      tap(({ user }) => this.setUser(user)),
      pluck('user'),
      catchError(() => of(null))
    );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}`, 'locale': this.lepedService.localeVar || 'BR' };
  }

  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */
  checkTheUserOnTheFirstLoad(): Promise<User | null> {
    return firstValueFrom(this.me());
  }
}
