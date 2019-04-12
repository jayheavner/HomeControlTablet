import _ from 'lodash';

export const upsertArray = (array, key, newval) => {
  var match = _.find(array, key);
  if (match) {
    var index = _.indexOf(array, _.find(array, key));
    array.splice(index, 1, newval);
  } else {
    array.push(newval);
  }
  return array;
};

export const cleanSource = source => {
  // using native JSON functions removes reactivity
  // so we can clone an object without mutating the original source
  return JSON.parse(JSON.stringify(source));
};

export const buildList = (type, items, match) => {
  if (!Array.isArray(items)) throw `type ${type.name} - items is not an array`;
  debugger;
  let list = [];
  const filteredItems = items.result.find(i => i.entity_id === match);
  filteredItems.attributes.entity_id.forEach(item => {
    const result = items.result.find(all => all.entity_id === item);
    var o = new type(result);
    list.push(o);
  });
  return list;
};

export const toPascalCase = input => {
  return input.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

export const getDomain = (entity_id, toPascal) => {
  let domain = entity_id.substring(0, entity_id.indexOf('.'));
  return toPascal ? toPascalCase(domain) : domain;
};

export const pluckEntity = (entities, entity_id) => {
  let entity = {};
  if (Array.isArray(entities.data))
    entity = entities.data.find(s => s.entity_id === entity_id);
  else entity = entity.data;
  return entity;
};

export function debounce(func, wait, immediate) {
  let timeout;

  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
