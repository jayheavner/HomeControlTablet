import { send } from '@/socket';
import ServiceBase from './base';

const turnOff = entity_id => {
  ServiceBase(entity_id, 'turn_off').then(service => {
    send(service);
  });
};

export default turnOff;
