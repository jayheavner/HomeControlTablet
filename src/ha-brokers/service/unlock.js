import { send } from '@/socket';
import ServiceBase from './base';

const lock = () => {
  ServiceBase('lock.front_door', 'unlock').then(service => {
    send(service);
  });
};

export default lock;
