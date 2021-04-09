import React from 'react';
import Remove from '../icon/Remove';
import Success from '../icon/Success';
import Edit from '../icon/Edit';
import Warning from '../icon/Warning';
import Alert from '../icon/Alert';
import Comment from '../icon/Comment';
import { notification } from 'antd';

export var openNotification = function openNotification(type, action, title, content) {
  var description = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var duration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

  var dataIcon = {
    'success': React.createElement(Success, null),
    'error': React.createElement(Success, null),
    'comment': React.createElement(Comment, null),
    'alert': React.createElement(Alert, null),
    'warning': React.createElement(Warning, null),
    'edit': React.createElement(Edit, null),
    'remove': React.createElement(Remove, null)
  };
  notification.open({
    message: React.createElement('p', { dangerouslySetInnerHTML: { __html: '<font color="#172b4d"><b>[' + title + ']</b> ' + content + '</font>' } }),
    description: description,
    onClick: action,
    duration: duration,
    icon: dataIcon[type],
    className: 'fwork-notification ' + type
  });
};