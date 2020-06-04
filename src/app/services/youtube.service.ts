import { YoutubeResponse } from './../models/youtube.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubwUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = '' //Api de youtube;
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';



  constructor(public http: HttpClient) { }


  getVideos() {

    const url = `${this.youtubwUrl}/playlistItems`;
    const params = new HttpParams()
                        .set('part', 'snippet')
                        .set('maxResults', '10')
                        .set('playlistId', this.playlist)
                        .set('key', this.apikey)
                        .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params }) // params:params
                    .pipe(
                        map(resp => {
                          console.log(resp);
                          this.nextPageToken = resp.nextPageToken;
                          return resp.items;
                        }),
                        map(items => items.map( video => video.snippet ))
                      );
  }


}
