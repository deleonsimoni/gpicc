import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComumService {

  localeVar;

  constructor(
    private http: HttpClient
  ) { }

  montarHomeLeped() {
    return this.http.get(`/api/gpicc-user/montarHomeLeped`);
  }

  listQuemSomos() {
    return this.http.get(`/api/gpicc-user/quemsomos`);
  }

  cadastrarQuemSomos(file: File, form: any) {
    const formData: FormData = new FormData();
    formData.append('fileArray', file, `${file.name}`);
    formData.append('formulario', JSON.stringify(form));
    return this.http.post(`/api/gpicc-user/quemsomos`, formData);
  }

  deletarQuemSomos(form: any) {
    return this.http.delete(`/api/gpicc-user/quemsomos/${form._id}`);
  }

  atualizarQuemSomos(file: File, form: any) {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    formData.append('formulario', JSON.stringify(form));
    return this.http.put(`/api/gpicc-user/quemsomos/`, formData);
  }


  listPostagens() {
    return this.http.get(`/api/gpicc-user/noticia`);
  }

  listNoticia() {
    return this.http.get(`/api/grupos-pesquisa/parceiros?type=gpicc`);
  }

  listNoticiaCarrossel() {
    return this.http.get(`/api/gpicc-user/noticiaCarrossel`);
  }

  cadastrarNoticia(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form.value));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`/api/gpicc-user/noticia`, formData);
  }

  deletarNoticia(_id: any) {
    return this.http.delete(`/api/gpicc-user/noticia/${_id}`);
  }

  atualizarNoticia(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.http.put(`/api/gpicc-user/noticia`, formData);
  }


  listEvento() {
    return this.http.get(`/api/gpicc-user/eventos`);
  }

  cadastrarEvento(file: any, form: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`/api/gpicc-user/eventos`, formData);
  }

  deletarEvento(_id: any) {
    return this.http.delete(`/api/gpicc-user/eventos/${_id}`);
  }

  atualizarEvento(file: any, form: any) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.http.put(`/api/gpicc-user/eventos/`, formData);
  }


  listCoordenadoras() {
    return this.http.get(`/api/gpicc-user/coordenadoras`);
  }

  cadastrarCoordenadoras(form: any) {
    return this.http.post(`/api/gpicc-user/coordenadoras`, form);
  }

  deletarCoordenadoras(form: any) {
    return this.http.delete(`/api/gpicc-user/coordenadoras/${form._id}`);
  }

  atualizarCoordenadoras(form: any) {
    return this.http.put(`/api/gpicc-user/coordenadoras/`, form);
  }


  listGrupoPesquisa() {
    return this.http.get(`/api/gpicc-user/grupoPesquisa`);
  }

  cadastrarGrupoPesquisa(form: any) {
    return this.http.post(`/api/gpicc-user/grupoPesquisa`, form);
  }

  deletarGrupoPesquisa(form: any) {
    return this.http.delete(`/api/gpicc-user/grupoPesquisa/${form._id}`);
  }

  atualizarGrupoPesquisa(form: any) {
    return this.http.put(`/api/gpicc-user/grupoPesquisa/`, form);
  }


  listGaleria() {
    return this.http.get(`/api/gpicc-user/galeria`);
  }

  cadastrarGaleria(form: any) {
    return this.http.post(`/api/gpicc-user/galeria`, form);
  }

  deletarGaleria(form: any) {
    return this.http.delete(`/api/gpicc-user/galeria/${form._id}`);
  }

  atualizarGaleria(form: any) {
    return this.http.put(`/api/gpicc-user/galeria/`, form);
  }
}
