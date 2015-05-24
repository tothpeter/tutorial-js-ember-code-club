import config from '../config/environment';
import Firebase from 'firebase';

export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  const firebase = application.firebase || new Firebase(config.firebase);
  application.register('service:firebase', firebase, { instantiate: false });
}

export default {
  name: 'firebase',
  initialize: initialize
};
