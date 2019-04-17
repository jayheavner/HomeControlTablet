import base from '../base';

export const status = async () => {
  return base.getState('lock.front_door');
};

export const lock = async () => {
  return base.postService('lock', 'lock', {
    entity_id: 'lock.front_door'
  });
};

export const unlock = async () => {
  return base.postService('lock', 'unlock', {
    entity_id: 'lock.front_door'
  });
};
