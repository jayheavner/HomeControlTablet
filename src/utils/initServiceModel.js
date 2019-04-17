import store from '@/store';
import { ServiceModel } from '@/models';

export const init = (entity_id, service) => {
  return store.dispatch('homeassistant/getNextConnection').then(id => {
    return new ServiceModel(id, entity_id, service);
  });
};
