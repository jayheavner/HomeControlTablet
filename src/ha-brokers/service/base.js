import store from '@/store';
import { init } from '@/utils/initServiceModel';
import { getDomain } from '@/utils';

const ServiceBase = (entity_id, service) => {
  return init(entity_id, service).then(model => {
    const domain = getDomain(entity_id, true);
    store.dispatch(`${domain}/updateFromDashboard`, model);
    return model;
  });
};

export default ServiceBase;
