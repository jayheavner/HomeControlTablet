import { send } from '@/socket';
import ServiceBase from './base';

const setBrightness = (light, brightness) => {
  ServiceBase(light.entity_id, 'turn_on').then(service => {
    service.service_data.brightness = brightness;
    send(service);
  });
};

export default setBrightness;
