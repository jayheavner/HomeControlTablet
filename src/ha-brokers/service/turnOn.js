import { send } from '@/socket';
import ServiceBase from './base';

const turnOn = entity_id => {
  ServiceBase(entity_id, 'turn_on').then(service => {
    send(service);
  });
};

export default turnOn;
