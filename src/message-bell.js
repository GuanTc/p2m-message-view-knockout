/**
 * Created by colinhan on 24/02/2017.
 */

const client = require('p2m-message-client');
const ko = require('knockout');

module.exports = ko.components.register('message-bell', {
  viewModel: function (params) {
    var self = this;

    this.unreadCount = ko.observable(0);

    function onUnreadChange(unreadCount) {
      self.unreadCount(unreadCount);
    }

    client.on('unreadChange', onUnreadChange);

    client.unreadCount().then(function(count) {
      self.unreadCount(count);
    });
  },
  template:
      '<span class="message-bell"> \
        <span class="glyphicon glyphicon-bell"></span>\
        <!-- ko if: unreadCount -->\
        <span class="badge" data-bind="text: unreadCount"></span>\
        <!-- /ko --> \
      </span>'
});