import Light from './light';

const actions = {
  update(context, msg) {
    Light.actions.update(context, msg);
  }
};

const module = {
  namespaced: true,
  actions
};

export default module;
