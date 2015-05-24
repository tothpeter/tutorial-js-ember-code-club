import Ember from 'ember';
const { inject } = Ember;

export default Ember.Route.extend({
  firebase: inject.service(),

  model() {
    return {
      credentials: {}
    };
  },

  actions: {
    authenticate() {
      const firebase = this.get('firebase');
      const credentials = this.get('currentModel.credentials');

      this.set('currentModel.isLoading', true);
      this.set('currentModel.error', null);

      firebase.authWithPassword(credentials, error => {
        this.set('currentModel.isLoading', false);

        if (error) {
          this.set('currentModel.error', error);
        } else {
          this.transitionTo('authenticated');
        }
      });
    }
  }
});
