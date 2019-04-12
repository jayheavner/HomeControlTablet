<template>
  <div v-scroll class="artists-view" @vScroll="loadMore">
    <entity-header title="Artists" />
    <div class="artists-view__content">
      <media-container>
        <template>
          <media-object
            v-for="item in artists.items"
            :id="item.id"
            :key="item.id"
            :uri="item.uri"
            :name="item.name"
            :type="item.type"
            :cover-img="item.images"
          />
        </template>
      </media-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import EntityHeader from '@/components/Spotify/EntityHeader';
import MediaObject from '@/components/Spotify/MediaObject';
import MediaContainer from '@/components/Spotify/MediaContainer';
import { getParameterByName } from '@/utils';

export default {
  name: 'ArtistsView',

  components: {
    MediaObject,
    EntityHeader,
    MediaContainer
  },

  data() {
    return {
      artists: {
        limit: 20,
        offset: 0,
        total: 1,
        after: null,
        items: []
      },
      isMore: null
    };
  },

  computed: {
    ...mapState('library', { myArtists: 'artists' })
  },

  created() {
    console.log('%cSpotifyArtistsView', 'background: blue;');
    this.getArtist();
  },

  methods: {
    async getArtist() {
      try {
        const a = this.a;
        if (this.artists.total > this.artists.offset) {
          const response = await api.spotify.follow.getFollowedArtists(
            this.artists.limit,
            this.artists.after
          );

          this.artists.after = getParameterByName(
            'after',
            response.data.artists.next
          );
          this.artists.total = response.data.artists.total;
          this.artists.items.push(...response.data.artists.items);
          this.artists.offset = this.artists.items.length;
          this.isMore = false;
        }
      } catch (e) {
        console.error(e);
      }
    },

    async loadMore(ev) {
      if (this.isMore) {
        return false;
      }

      if (ev.detail.scrollbarV.percent > 70) {
        this.isMore = true;
        this.getArtist();
      }
    }
  }
};
</script>

<style scoped lang="sass"></style>
