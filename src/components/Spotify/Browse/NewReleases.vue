<template>
  <div v-scroll class="new-releases-view" @vScroll="loadMore">
    <entity-header title="New albums & singles" :small="true" />
    <div class="new-releases-view__inner">
      <media-container>
        <media-object
          v-for="(item, index) in albums.items"
          :id="item.id"
          :key="index"
          :uri="item.uri"
          :cover-img="item.images"
          :name="item.name"
          :artists="item.artists"
          :type="item.type"
        />
      </media-container>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import MediaObject from '@/components/Spotify/MediaObject';
import EntityHeader from '@/components/Spotify/EntityHeader';
import MediaContainer from '@/components/Spotify/MediaContainer';

export default {
  name: 'NewReleases',

  components: {
    EntityHeader,
    MediaObject,
    MediaContainer
  },

  data() {
    return {
      albums: {
        limit: 25,
        offset: 0,
        total: 1,
        items: []
      },
      more: null
    };
  },

  created() {
    this.getNewReleases();
  },

  methods: {
    async getNewReleases() {
      try {
        if (this.albums.total > this.albums.offset) {
          const response = await api.spotify.browse.getNewReleases(
            this.albums.offset,
            this.albums.limit
          );

          this.albums.offset = response.data.albums.offset + this.albums.limit;
          this.albums.total = response.data.albums.total;
          this.albums.items.push(...response.data.albums.items);
          this.more = false;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async loadMore(ev) {
      if (this.more) {
        return false;
      }

      if (ev.detail.scrollbarV.percent > 70) {
        this.more = true;
        this.getNewReleases();
      }
    }
  }
};
</script>

<style scoped lang="sass">

.new-releases-view
  height: calc(100vh - 227px)
</style>
