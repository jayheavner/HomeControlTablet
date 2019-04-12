import base from '../base';
import store from '@/store';

// export const status = async () => {
//   return base.getState('lock.front_door');
// };
const domain = 'homeassistant';

export const on = async entity_id => {
  debugger;
  return base.postService(entity_id, domain, 'turn_on', {
    entity_id: entity_id
  });
};

export const off = async entity_id => {
  debugger;
  return base.postService(entity_id, domain, 'turn_off', {
    entity_id: entity_id
  });
};
