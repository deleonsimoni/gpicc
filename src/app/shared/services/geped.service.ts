import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GepedService {

  private url = '/api/geped-user';

  constructor(
    private httpClient: HttpClient
  ) { }


  public listHome(type): Observable<any> {
    return this.httpClient.get(`${this.url}/home?type=${type}`);
  }

  public getArtigo(type): Observable<any> {
    return this.httpClient.get(`${this.url}/artigo?type=${type}`);
  }

  public getCapitulos(type): Observable<any> {
    return this.httpClient.get(`${this.url}/capitulos?type=${type}`);
  }

  public getLivro(type): Observable<any> {
    return this.httpClient.get(`${this.url}/livro?type=${type}`);
  }

  public getTeses(type): Observable<any> {
    return this.httpClient.get(`${this.url}/teses?type=${type}`);
  }

  public listPesquisa(type, typePesquisa): Observable<any> {
    return this.httpClient.get(`${this.url}/pesquisa?type=${type}&typePesquisa=${typePesquisa}`);
  }
  public listExtensaoEnsino(type, typeExtensao): Observable<any> {
    return this.httpClient.get(`${this.url}/extensao-ensino?type=${type}&typeExtensao=${typeExtensao}`);
  }


}
