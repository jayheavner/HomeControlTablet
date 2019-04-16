import { getDomain } from '@/utils';

class Service {
  constructor(id, entity_id, service) {
    const domain = getDomain(entity_id);
    this.id = id;
    this.type = 'call_service';
    this.domain = domain;
    this.service = service;
    this.service_data = {
      entity_id: entity_id
    };
    console.log(this);
  }
}
export default Service;
