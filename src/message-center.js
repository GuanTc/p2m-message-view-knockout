/**
 * Created by colinhan on 01/03/2017.
 */

//require('bootstrap-switch');
const ko = require('knockout');

require('./message-bell');
require('./message-panel');
module.exports = ko.components.register('message-center', {
  viewModel: function (params) {
    this.messageTemplate = params.messageTemplate;
    this.unreadOnly = ko.observable(false);
    this.switchClick = function (data, event) {
      // To avoid close dropdown.
      let checked = !this.unreadOnly();
      this.unreadOnly(checked);
      $('input', event.currentTarget).prop('checked', checked);
      event.stopPropagation();
    }
  },
  template: ' \
    <li class="dropdown message-center"> \
      <a href="#" class="dropdown-toggle" \
         data-toggle="dropdown" \
         data-bind="component: {name: \'message-bell\'}"></a> \
      <div class="dropdown-menu"> \
        <div class="message-center-header">\
          <label class="pull-left message-center-title">通知：</label>\
          <div class="switch pull-right" data-bind="click: switchClick"> \
            <input id="unread-only" class="toggle-switch" type="checkbox"> \
            <label for="unread-only">显示已读通知</label> \
          </div>\
        </div> \
        <!-- ko component: { \
          name: \'message-panel\', \
          params: { \
            messageTemplate: messageTemplate, \
            unreadOnly: unreadOnly\
          } \
        } --> \
        <!-- /ko --> \
      </div> \
    </li> \
    '
});