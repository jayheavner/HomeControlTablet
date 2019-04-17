import { send } from '@/socket';
import ServiceBase from './base';

const setVolume = (speaker, volume) => {
  ServiceBase(speaker.entity_id, 'volume_set').then(service => {
    service.service_data.volume_level = volume;
    send(service);
  });
};

export default setVolume;
