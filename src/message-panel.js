/**
 * Created by colinhan on 24/02/2017.
 */

const client = require('p2m-message-client');
const ko = require('knockout');

module.exports = ko.components.register('message-panel', {
  viewModel: function (params) {
    var self = this;

    this.messages = ko.observableArray();
    this.unreadCount = ko.observable(0);
    this.filter = ko.observable();
    this.messageTemplate = params.messageTemplate;
    this.unreadOnly = params.unreadOnly;
    this.unreadOnly.subscribe(function (newValue) {
      refresh(newValue ? '' : 'unread');
    });

    this.onClick = function (message, event) {
      if (!message.isRead()) {
        client.read(message.sendId())
            .then(function (result) {
              if (result.success) {
                message.isRead(true);
              }
            });
      }

      return true;
    };

    function refresh(filter) {
      if (filter == null) {
        filter = self.filter();
      }
      client.messages({filter: filter}).then(function (result) {
        self.filter(filter);
        self.messages.removeAll();
        var messages = result.displayMessages.map(function (m) {
          var r = {};
          for (var prop in m) {
            if (m.hasOwnProperty(prop)) {
              r[prop] = ko.observable(m[prop]);
            }
          }
          return r;
        });
        self.messages.push.apply(self.messages, messages);
        self.unreadCount(result.unreadCount);
      })
    }

    client.on('message', refresh);
    refresh(this.unreadOnly() ? '' : 'unread');
  },
  template: ' \
  <ul class="messages"> \
      <!-- ko foreach: { data: messages, as: \'message\' } -->\
      <li class="message" data-bind="css: { unread: !message.isRead() }, click: $parent.onClick">\
        <!-- ko template: {\
          if: $parent.messageTemplate,\
          name: $parent.messageTemplate, \
          data: message } -->\
        <!-- /ko --> \
        <!-- ko template: {\
          if: !$parent.messageTemplate,\
          nodes: $componentTemplateNodes, \
          data: message } -->\
        <!-- /ko --> \
      </li> \
    <!-- /ko -->\
    <div class="empty-tip" data-bind="if: messages().length == 0"> \
      没有符合条件的通知。 \
    </div> \
  </ul> '
});
