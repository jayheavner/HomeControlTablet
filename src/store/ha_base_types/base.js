const actions = {
  update(context, msg, type, namespace) {
    const entity_id = msg.event.data.entity_id;
    const entities = this.getters[`${namespace}/getEntities`];
    const match = entities.find(s => s.entity_id === entity_id);
    if (match === undefined) return;
    const entity = new type(msg.event.data);
    this.dispatch(`${namespace}/updateEntity`, entity);
  }
};

const module = {
  namespaced: true,
  actions
};

export default module;
