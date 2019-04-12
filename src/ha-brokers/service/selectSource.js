import { send } from '@/socket';
import ServiceBase from './base';

const selectSource = (entity_id, source) => {
  ServiceBase(entity_id, 'select_source').then(service => {
    service.service_data.source = source;
    send(service);
  });
};

export default selectSource;
