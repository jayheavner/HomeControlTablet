class Zone {
  constructor(result) {
    this.entity_id = result.entity_id;
    this.name = result.attributes.friendly_name;
    this.entities = result.attributes.entity_id;
  }
}

export default Zone;
