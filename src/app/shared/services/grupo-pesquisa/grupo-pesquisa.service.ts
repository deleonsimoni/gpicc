import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Coordenadora } from "@app/shared/types";
import { forkJoin, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GrupoPesquisaService {

  private url = '/api/leped/grupo-pesquisa';

  constructor(
    private httpClient: HttpClient
  ) { }

  public save(files: any, grupo: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(grupo));

    if (files[0]) {
      formData.append('fotoGrupo', files[0], `${files[0].name}`);
    }

    if (files[1]) {
      formData.append('fotoCoordenadora', files[1], `${files[1].name}`);
    }

    if (files[2]) {
      files[2].forEach((el: any, key: any) => {
        formData.append(`galeria${key + 1}`, el, el.name);
      });
    }

    return this.httpClient.post(this.url, formData);
  }

  public listAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public find(id: string): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public update(files: any, grupo: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(grupo));

    if (files[0]) {
      formData.append('fotoGrupo', files[0], `${files[0].name}`);
    }

    if (files[1]) {
      formData.append('fotoCoordenadora', files[1], `${files[1].name}`);
    }

    if (files[2].length > 0) {
      let key = 1;
      files[2].forEach((el: any) => {
        formData.append(`galeria${key++}`, el, el.name);
      });
    }

    return this.httpClient.put(this.url, formData);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  listPesquisa(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/pesquisas?type=${type}`);
  }

  cadastrarPesquisa(form: any, type) {
    return this.httpClient.post(`/api/grupos-pesquisa/pesquisas?type=${type}`, form);
  }

  deletarPesquisa(form: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/pesquisas/${form}?type=${type}`);
  }

  atualizarPesquisa(form: any, type) {
    return this.httpClient.put(`/api/grupos-pesquisa/pesquisas?type=${type}`, form);
  }

  listTese(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/teses?type=${type}`);
  }

  cadastrarTese(form: any, type) {
    return this.httpClient.post(`/api/grupos-pesquisa/teses?type=${type}`, form);
  }

  deletarTese(form: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/teses/${form}?type=${type}`);
  }

  atualizarTese(form: any, type) {
    return this.httpClient.put(`/api/grupos-pesquisa/teses?type=${type}`, form);
  }

  listArtigo(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/artigos?type=${type}`);
  }

  cadastrarArtigo(form: any, type) {
    return this.httpClient.post(`/api/grupos-pesquisa/artigos?type=${type}`, form);
  }

  deletarArtigo(form: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/artigos/${form}?type=${type}`);
  }

  atualizarArtigo(form: any, type) {
    return this.httpClient.put(`/api/grupos-pesquisa/artigos?type=${type}`, form);
  }

  listExtensaoEnsino(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/extensao-ensino?type=${type}`);
  }

  cadastrarExtensaoEnsino(form: any, type) {
    return this.httpClient.post(`/api/grupos-pesquisa/extensao-ensino?type=${type}`, form);
  }

  deletarExtensaoEnsino(form: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/extensao-ensino/${form}?type=${type}`);
  }

  atualizarExtensaoEnsino(form: any, type) {
    return this.httpClient.put(`/api/grupos-pesquisa/extensao-ensino?type=${type}`, form);
  }

  listCapitulo(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/capitulos?type=${type}`);
  }

  cadastrarCapitulo(form: any, type) {
    return this.httpClient.post(`/api/grupos-pesquisa/capitulos?type=${type}`, form);
  }

  deletarCapitulo(form: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/capitulos/${form}?type=${type}`);
  }

  atualizarCapitulo(form: any, type) {
    return this.httpClient.put(`/api/grupos-pesquisa/capitulos?type=${type}`, form);
  }
  listParticipantesGrupo(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/participantes-grupo?type=${type}`);
  }

  cadastrarParticipantesGrupo(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.post(`/api/grupos-pesquisa/participantes-grupo?type=${type}`, formData);
  }

  deletarParticipantesGrupo(id: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/participantes-grupo/${id}?type=${type}`);
  }

  atualizarParticipantesGrupo(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.put(`/api/grupos-pesquisa/participantes-grupo?type=${type}`, formData);
  }


  listLivro(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/livro?type=${type}`);
  }

  cadastrarLivro(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.post(`/api/grupos-pesquisa/livro?type=${type}`, formData);
  }

  deletarLivro(id: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/livro/${id}?type=${type}`);
  }

  atualizarLivro(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.put(`/api/grupos-pesquisa/livro?type=${type}`, formData);
  }

  listParceiro(type) {
    return this.httpClient.get(`/api/grupos-pesquisa/parceiros?type=${type}`);
  }

  cadastrarParceiro(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.post(`/api/grupos-pesquisa/parceiros?type=${type}`, formData);
  }

  deletarParceiro(id: any, type) {
    return this.httpClient.delete(`/api/grupos-pesquisa/parceiros/${id}?type=${type}`);
  }

  atualizarParceiro(file: any, form: any, type) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.put(`/api/grupos-pesquisa/parceiros?type=${type}`, formData);
  }

}
