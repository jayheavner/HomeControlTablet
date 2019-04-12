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
import ModalView from '@/views/Modal';
import LightView from '@/views/Lights';
import MusicView from '@/views/Music';
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

// specific sidebar components
import LightSidebar from '@/components/sidebars/Light';
import MusicSidebar from '@/components/sidebars/Music';

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
        default: HomeView
      }
    },
    {
      path: '/modal',
      name: 'modal',
      meta: {
        layout: 'home'
      },
      component: ModalView
    },
    {
      path: '/lights',
      name: 'lights',
      meta: {
        layout: 'sidebar'
      },
      components: {
        default: LightView,
        sidebar: LightSidebar
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
        // {
        //   path: 'library',
        //   name: 'spotify-library',
        //   meta: {
        //     layout: 'footer'
        //   },
        //   components: {
        //     default: SpotifyLibrary,
        //     footer: SpotifyTabletFooter
        //   }
        // }
      ]
    },
    {
      path: '/music',
      name: 'music',
      meta: {
        layout: 'sidebar'
      },
      components: {
        default: MusicView,
        sidebar: MusicSidebar
      }
    },
    {
      path: '/music/artist/:id',
      name: 'artist',
      meta: {
        layout: 'navbar'
      },
      components: {
        default: ArtistView,
        sidebar: MusicSidebar,
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
        sidebar: MusicSidebar,
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
        sidebar: MusicSidebar,
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
        sidebar: MusicSidebar,
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
        sidebar: MusicSidebar,
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
        sidebar: MusicSidebar,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/playlist/:playlist_id',
      name: 'playlist',
      components: {
        default: PlaylistView,
        sidebar: MusicSidebar,
        navbar: SpotifyNavbar
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        default: SpotifySearchView,
        sidebar: MusicSidebar
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
