import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = '/api/chat';

  constructor(
    private httpClient: HttpClient
  ) { }


  public getChat(pageChoose): Observable<any> {
    return this.httpClient.get(`${this.url}/chat?page=${pageChoose}`);
  }

  public getUserChat(email): Observable<any> {
    return this.httpClient.get(`${this.url}/chat/getUser?email=${email}`);
  }

  public getChatbyID(id): Observable<any> {
    return this.httpClient.get(`${this.url}/chat?id=${id}`);
  }

  public postChat(msg): Observable<any> {
    return this.httpClient.post(`${this.url}/chat`, msg);
  }

  public postChatUserPrivate(user, msg): Observable<any> {
    return this.httpClient.post(`${this.url}/chat/postChatUserPrivate`, { user, msg });
  }

  public putChat(id, msg): Observable<any> {
    return this.httpClient.put(`${this.url}/chat?id=${id}`, msg);
  }



}
