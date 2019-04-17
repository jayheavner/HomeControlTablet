class Speaker {
  constructor(result) {
    if (result.attributes === undefined && result.new_state)
      result = result.new_state;

    this.entity_id = result.entity_id;
    this.power = result.state;

    var speaker = result.attributes.friendly_name.replace(' Speaker', '');
    this.name = speaker;
    this.sources = result.attributes.source_list;
    this.source = result.attributes.source;
    this.media_title = result.attributes.media_title;
    this.muted = result.attributes.is_volume_muted;
    this.volume = result.attributes.volume_level;
    this.attributes = result.attributes;
  }
}

export default Speaker;
