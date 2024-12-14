import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private host: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }



  public getAds(): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.get<HttpResponse<any> | HttpErrorResponse>(`${this.host}/posts`,
      {observe: 'response'});
  }

  public getAdsPageById(pageId: number): Observable<HttpResponse<any> | HttpErrorResponse> {

    return this.http.get<HttpResponse<any> | HttpErrorResponse>(`${this.host}/posts/${pageId}`,
      {observe: 'response'});
  }

}
