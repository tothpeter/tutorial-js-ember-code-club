import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'code-club/tests/helpers/start-app';

let application;
let firebase;

module('Acceptance | authentication', {
  beforeEach: function() {
    firebase = new MockFirebase();
    application = startApp({ firebase });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('success', function(assert) {
  visit('/');
  fillIn('input[type="email"]', 'tothpeter08@gmail.com');
  fillIn('input[type="password"]', '12345678');
  click('button[type="submit"]');
  firebase.authWithPassword = ({ email, password}, callback) => {
    assert.equal(email, 'tothpeter08@gmail.com');
    assert.equal(password, '12345678');

    const authData = { uid: 'test-data' };

    firebase.changeAuthState(authData);
    firebase.flush();

    callback(null, authData);
  };

  andThen(() => {
    assert.ok(find(':contains("Logged in")').length,
      'expected to see "Logged in"');
  });
});


test('error', function(assert) {
  visit('/');
  fillIn('input[type="email"]', 'tothpeter08@gmail.com');
  fillIn('input[type="password"]', '12345678');
  click('button[type="submit"]');
  firebase.authWithPassword = ({ email, password}, callback) => {
    assert.equal(email, 'tothpeter08@gmail.com');
    assert.equal(password, '12345678');

    const error = new Error('Invalid password');

    callback(error);
  };

  andThen(() => {
    assert.ok(find(':contains("Invalid password")').length,
      'expected to see "Invalid password"');
  });
});