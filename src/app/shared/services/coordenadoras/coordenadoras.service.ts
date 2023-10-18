import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Coordenadora } from "@app/shared/types";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CoordenadorasService {

  private url = '/api/leped/coordenadoras'

  constructor(
    private httpClient: HttpClient
  ) {}

  public save(file: any, coordenadora: Coordenadora): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(coordenadora));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.post(this.url, formData);
  }

  public listAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public find(id: string): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public update(file: any, coordenadora: Coordenadora): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(coordenadora));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }

    return this.httpClient.put(this.url, formData);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
