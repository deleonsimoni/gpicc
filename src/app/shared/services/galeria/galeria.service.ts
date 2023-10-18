import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private url = "/api/leped/galeria";

  constructor(
    private http: HttpClient
  ) {}

  public retrieveImages(): Observable<any> {
    return this.http.get(this.url);
  }

  public registerImages(files: Array<File>): Observable<any> {
    const formData: FormData = new FormData();

    files.forEach((el: any, key: any) => {
      formData.append(`galeria${key + 1}`, el, el.name);
    });

    return this.http.post(this.url, formData);
  }

  public deleteImage(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
