import base from '../base';

export const getSpeaker = async speakerId => {
  return base.getState(speakerId);
};

export const getSpeakers = async () => {
  return base.getStates().then(results => {
    // this isn't exactly right, speakers are a subset of `media_players`
    return results.find(filter => filter.entity_id.startsWith('media_player'));
  });
};

export const powerSpeakerOn = async speakerId => {
  debugger;
  return base.postService('media_player', 'turn_on', {
    entity_id: speakerId
  });
};

export const powerSpeakerOff = async speakerId => {
  return base.postService('media_player', 'turn_off', {
    entity_id: speakerId
  });
};

export const setSpeakerSource = async (speakerId, source) => {
  return base.postService('media_player', 'select_source', {
    entity_id: speakerId,
    source: source
  });
};
