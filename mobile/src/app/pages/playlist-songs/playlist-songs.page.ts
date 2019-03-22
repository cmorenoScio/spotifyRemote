import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.page.html',
  styleUrls: ['./playlist-songs.page.scss'],
})
export class PlaylistSongsPage implements OnInit {
  id: any;
  loading = true;
  tracks: any;
  tracksTemp: any;
  tracks$: any;

  playlistname: string;
  playlist$: any;
  playlists: any;
  playlists$: any;

  constructor(private _activatedRoute: ActivatedRoute, private _profileService: ProfileService) {
  }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('playlistId');
    this.getTracks();
    this.getPlaylistInfo();
  }

  async getTracks() {
    this.tracks$ = this._profileService.getPlaylistTracks(this.id).subscribe((data) => {
      this.tracks = data.items;
      this.tracksTemp = Object.assign(this.tracks);
      this.loading = false;
    }, (err) => {
      this.loading = false;
    });
  }

  async getPlaylistInfo() {
    this.playlists$ = this._profileService.getPlaylistInfo(this.id).subscribe((data) => {
      this.playlists = data;
      this.playlistname = data.name;
    },
      (err) => {
        console.log(err);
      });
  }

}
