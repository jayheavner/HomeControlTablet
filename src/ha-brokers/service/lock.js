import { send } from '@/socket';
import ServiceBase from './base';

const lock = () => {
  ServiceBase('lock.front_door', 'lock').then(service => {
    send(service);
  });
};

export default lock;
