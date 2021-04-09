import React from 'react';
import NoData from '../icon/NoData';

export default function NoNotification(props) {
  return React.createElement(
    'div',
    { className: 'no-notification' },
    React.createElement(NoData, null),
    React.createElement(
      'p',
      null,
      'B\u1EA1n kh\xF4ng c\xF3 th\xF4ng b\xE1o n\xE0o!'
    )
  );
}