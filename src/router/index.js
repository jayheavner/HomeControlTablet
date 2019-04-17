/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// import auth from '@/api/spotify/auth';
// Vue.use(auth);

//layouts
import FullScreen from '@/layouts/FullScreen';
Vue.component('full-screen-layout', FullScreen);

import NavBar from '@/layouts/NavBar';
Vue.component('nav-bar-layout', NavBar);

import Footer from '@/layouts/Footer';
Vue.component('footer-layout', Footer);

//views
import HomeView from '@/views/Home';
import LightView from '@/views/Lights';
import ArtistView from '@/views/Spotify/Artist';
import AlbumView from '@/views/Spotify/Album';
import SpotifySearchView from '@/views/Spotify/Search';
import SpotifySearchResultView from '@/views/Spotify/SearchResult';
import SpotifySearchAlbumView from '@/views/Spotify/SearchAlbum';
import SpotifySearchArtistView from '@/views/Spotify/SearchArtist';
import SpotifySearchPlaylistView from '@/views/Spotify/SearchPlaylist';
import SpotifySearchTrackView from '@/views/Spotify/SearchTrack';
import SpotifyTracksLibraryView from '@/views/Spotify/Library/Tracks';
import SpotifyAlbumsLibraryView from '@/views/Spotify/Library/Albums';
import SpotifyArtistsLibraryView from '@/views/Spotify/Library/Artists';
import SpotifyPlaylistsLibraryView from '@/views/Spotify/Library/Playlists';
import PlaylistView from '@/views/Spotify/Playlist';
import SpotifyView from '@/views/Spotify/Tablet';

// Footers
import HomeNav from '@/components/Footer/Home';
import LightNav from '@/components/Footer/Lights';

import Speakers from '@/components/Speakers';
import SpotifySearch from '@/components/Spotify/Search';
import SpotifyBrowse from '@/components/Spotify/Browse';
import SpotifyGenre from '@/components/Spotify/Genre';

// Spotify navbar
import SpotifyNavbar from '@/components/Spotify/Navbar';
import SpotifyTabletFooter from '@/components/Spotify/Tablet/Footer';

// spotify stuff
import spotifyLogout from '@/views/Spotify/Logout';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'footer'
      },
      components: {
        default: HomeView,
        footer: HomeNav
      }
    },
    {
      path: '/lights',
      name: 'lights',
      meta: {
        layout: 'footer'
      },
      components: {
        default: LightView,
        footer: LightNav
      }
    },
  {
    path: '/light/:id',
    name: 'light',
    meta: {
      layout: 'footer'
    },
    components: {
      default: LightView,
      footer: LightNav
    }
  },


    {
      path: '/spotify',
      name: 'spotify',
      meta: {
        layout: 'footer'
      },
      components: {
        default: SpotifyView,
        footer: SpotifyTabletFooter
      },
      children: [
        {
          path: 'speakers',
          name: 'spotify-speakers',
          meta: {
            layout: 'footer'
          },
          components: {
            default: Speakers,
            footer: SpotifyTabletFooter
          }
        },
        {
          path: 'search',
          name: 'spotify-search',
          meta: {
            layout: 'footer'
          },
          components: {
            default: SpotifySearch,
            footer: SpotifyTabletFooter
          }
        },
        {
          path: 'browse',
          name: 'spotify-browse',
          meta: {
            layout: 'footer'
          },
          components: {
            default: SpotifyBrowse,
            footer: SpotifyTabletFooter
          },
          children: [
            {
              path: 'genre/:id',
              name: 'spotify-browse-genre',
              meta: {
                layout: 'footer'
              },
              components: {
                default: SpotifyGenre,
                footer: SpotifyTabletFooter
              }
            }
          ]
        },
      ]
    },
    {
      path: '/music/artist/:id',
      name: 'artist',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: ArtistView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/music/album/:id',
      name: 'album',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: AlbumView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/library/tracks',
      name: 'tracks-library',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: SpotifyTracksLibraryView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/library/albums',
      name: 'albums-library',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: SpotifyAlbumsLibraryView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/library/artists',
      name: 'artists-library',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: SpotifyArtistsLibraryView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/library/playlists',
      name: 'playlists-library',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: SpotifyPlaylistsLibraryView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/playlist/:playlist_id',
      name: 'playlist',
      components: {
        default: PlaylistView,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        default: SpotifySearchView,
      },
      children: [
        {
          path: 'result/:query',
          name: 'search-result',
          component: SpotifySearchResultView
        },
        {
          path: 'album/:query',
          name: 'search-album',
          component: SpotifySearchAlbumView
        },
        {
          path: 'artist/:query',
          name: 'search-artist',
          component: SpotifySearchArtistView
        },
        {
          path: 'playlist/:query',
          name: 'search-playlist',
          component: SpotifySearchPlaylistView
        },
        {
          path: 'track/:query',
          name: 'search-track',
          component: SpotifySearchTrackView
        }
      ]
    },
    {
      path: '/spotify/callback',
      name: 'spotify-callback'
    },
    {
      path: '/spotify/logout',
      name: 'spotify-logout',
      component: spotifyLogout
    },
    {
      path: '/spotify/refresh_token',
      name: 'spotify-refresh-token'
    }
  ]
});

export default router;
