import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor(private _yts: YoutubeService) { }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this._yts.getVideos().subscribe(resp => {
      this.videos.push(...resp);
      console.log(this.videos);
    });
  }


  showVideo(video: Video) {
    console.log(video);
    Swal.fire({
      html: ` <h4>${ video.title }</h4>
              <iframe width="100%" height="315"
                    src="https://www.youtube.com/embed/${ video.resourceId.videoId }" frameborder="0" allow="accelerometer; autoplay;
                    encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
             </iframe>`
    });
  }

}
