import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LepedService {

  localeVar;

  constructor(
    private http: HttpClient
  ) { }

  montarHomeLeped() {
    return this.http.get(`/api/leped/montarHomeLeped`);
  }

  listQuemSomos() {
    return this.http.get(`/api/leped/quemsomos`);
  }

  cadastrarQuemSomos(file: File, form: any) {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `${file.name}`);
    formData.append('formulario', JSON.stringify(form));
    return this.http.post(`/api/leped/quemsomos`, formData);
  }

  deletarQuemSomos(form: any) {
    return this.http.delete(`/api/leped/quemsomos/${form._id}`);
  }

  atualizarQuemSomos(file: File, form: any) {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    formData.append('formulario', JSON.stringify(form));
    return this.http.put(`/api/leped/quemsomos/`, formData);
  }


  listNoticia() {
    return this.http.get(`/api/leped/noticia`);
  }

  listNoticiaCarrossel() {
    return this.http.get(`/api/leped/noticiaCarrossel`);
  }

  cadastrarNoticia(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`/api/leped/noticia`, formData);
  }

  deletarNoticia(_id: any) {
    return this.http.delete(`/api/leped/noticia/${_id}`);
  }

  atualizarNoticia(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.http.put(`/api/leped/noticia`, formData);
  }


  listEvento() {
    return this.http.get(`/api/leped/eventos`);
  }

  cadastrarEvento(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`/api/leped/eventos`, formData);
  }

  deletarEvento(_id: any) {
    return this.http.delete(`/api/leped/eventos/${_id}`);
  }

  atualizarEvento(file: any, form: any) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.http.put(`/api/leped/eventos/`, formData);
  }


  listCoordenadoras() {
    return this.http.get(`/api/leped/coordenadoras`);
  }

  cadastrarCoordenadoras(form: any) {
    return this.http.post(`/api/leped/coordenadoras`, form);
  }

  deletarCoordenadoras(form: any) {
    return this.http.delete(`/api/leped/coordenadoras/${form._id}`);
  }

  atualizarCoordenadoras(form: any) {
    return this.http.put(`/api/leped/coordenadoras/`, form);
  }


  listGrupoPesquisa() {
    return this.http.get(`/api/leped/grupoPesquisa`);
  }

  cadastrarGrupoPesquisa(form: any) {
    return this.http.post(`/api/leped/grupoPesquisa`, form);
  }

  deletarGrupoPesquisa(form: any) {
    return this.http.delete(`/api/leped/grupoPesquisa/${form._id}`);
  }

  atualizarGrupoPesquisa(form: any) {
    return this.http.put(`/api/leped/grupoPesquisa/`, form);
  }


  listGaleria() {
    return this.http.get(`/api/leped/galeria`);
  }

  cadastrarGaleria(form: any) {
    return this.http.post(`/api/leped/galeria`, form);
  }

  deletarGaleria(form: any) {
    return this.http.delete(`/api/leped/galeria/${form._id}`);
  }

  atualizarGaleria(form: any) {
    return this.http.put(`/api/leped/galeria/`, form);
  }
}
