import store from '@/store';
import { getDomain } from '@/utils';

const url = 'wss://home.beavners.com/api/websocket';
const connection = new WebSocket(url);

const isOpen = ws => {
  return ws.readyState === ws.OPEN;
};

const handleSubscribedMessage = msg => {
  if (msg.type !== 'event') return;
  const entity_id = msg.event.data.entity_id;
  let domain = getDomain(entity_id, true);
  if (domain === 'Switch') domain = 'Light';

  store.dispatch(`${domain}/updateStateChange`, msg);
  // }
};

const loadInitialStates = msg => {
  //store.dispatch('Light/initialize', msg);
  //store.dispatch('music/initialize', msg);
};

const parseMessage = msg => {
  switch (msg.id) {
    case 1:
      // subscribed message
      handleSubscribedMessage(msg);
      break;
    case 2:
      // get states
      loadInitialStates(msg);
      break;
    default:
      console.log(msg);
  }
};

const sendMessage = msg => {
  try {
    if (!isOpen(connection)) return;
    connection.send(JSON.stringify(msg));
  } catch (ex) {
    console.log(`%c socket error ${ex}`, 'background: red; color: white;');
  }
};

const socket = () => {
  connection.onopen = () => {
    console.log('%c socket opened ', 'background: green; color: white;');
  };

  connection.onclose = () => {
    console.log(
      '%c socket closed. Reconnecting...',
      'background: red; color: yellow; font-size: 2em;'
    );
    setTimeout(function() {
      socket();
    }, 1000);

    // sendMessage({
    //   'id': 99,
    //   'type': 'unsubscribe_events',
    //   'subscription': 18
    // });
  };

  connection.onerror = error => {
    console.log(`WebSocket error: ${error}`);
  };

  connection.onmessage = e => {
    let msg = !e.data ? {} : JSON.parse(e.data);

    if (msg.type === 'auth_required') {
      console.log('authenticating');
      const auth_msg = {
        type: 'auth',
        access_token: process.env.VUE_APP_HA_ACCESS_TOKEN
      };
      sendMessage(auth_msg);
    } else if (msg.type === 'auth_ok') {
      // we are authenticated. Update state.
      store.dispatch('homeassistant/isConnected', true);
      const subscribe = {
        id: 1,
        type: 'subscribe_events',
        event_type: 'state_changed'
      };
      sendMessage(subscribe);
      sendMessage({
        id: 2,
        type: 'get_states'
      });
    } else {
      parseMessage(msg);
    }
  };
};

socket();

export const send = msg => {
  sendMessage(msg);
};
