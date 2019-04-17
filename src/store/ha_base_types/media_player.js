import { SpeakerModel } from '@/models';

const actions = {
  updateStateChange(context, msg) {
    // this will handle all media players. For now, all I care about is the house speakers so I'm going to see
    // if this request is from one of those speakers and forward it to my music store if so.
    const entity_id = msg.event.data.entity_id;
    const speakers = this.state.speakers.speakers;
    try {
      if (speakers.find(s => s.entity_id === entity_id)) {
        const speaker = new SpeakerModel(msg.event.data);
        this.dispatch('speakers/updateSpeaker', speaker);
      } else if (entity_id === 'media_player.spotify') {
        console.log(
          '%c Received a socket message for spotify. Calling player/initialize()',
          'color:white; background: blue; font-size: 1.2em;'
        );
        console.dir(msg);
        this.dispatch('player/initialize', msg);
      }
    } catch (e) {
      //debugger;
    }
  },
  updateFromDashboard(context, msg) {
    // placeholder - I don't need to do anything yet
  }
};

const module = {
  namespaced: true,
  actions
};

export default module;
