class Light {
  constructor(obj) {
    let newObj = {};
    // need to determine the `type` coming in and parse accordingly

    if (
      arguments.constructor.name === 'Service' ||
      (obj.type !== undefined && obj.type === 'call_service')
    ) {
      // this is a `service` call made from the dashboard
      newObj = parseService(obj);
    } else if (obj.attributes !== undefined) {
      // this is a socket subscription where a state change has been pushed
      newObj = parseStateLoad(obj);
    } else if (obj.new_state) {
      // this is a socket subscription where a state change has been pushed
      newObj = parseStateChange(obj);
    }

    this.entity_id = newObj.entity_id;
    this.state = newObj.state;
    this.name = newObj.name;
    this.brightness = newObj.brightness;
    this.isDimmable = newObj.isDimmable;
    this.attributes = newObj.attributes;
  }
}

const parseService = o => {
  return {
    entity_id: o.service_data.entity_id,
    state: o.service === 'turn_on' ? 'on' : 'off'
  };
  // this is a partial object. To get the rest, call the Light/getLights, find, and set
};

const parseStateChange = o => {
  // everything we need is in `new_state`
  return parseStateLoad(o.new_state);
};

const parseStateLoad = o => {
  return {
    entity_id: o.entity_id,
    state: o.state,
    name: o.attributes.friendly_name
      .replace(' Lights', '')
      .replace('Light', ''),
    brightness: o.attributes.brightness,
    isDimmable: o.entity_id.startsWith('light') ? true : false,
    attributes: o.attributes
  };
};

export default Light;
