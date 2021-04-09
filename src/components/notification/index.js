import React from 'react';
import Remove from '../icon/Remove';
import Success from '../icon/Success';
import Edit from '../icon/Edit';
import Warning from '../icon/Warning';
import Alert from '../icon/Alert';
import Comment from '../icon/Comment';
import { notification } from 'antd';

export const openNotification = (type, action, title, content, description = null, duration = 5) => {
  const dataIcon = {
    'success': <Success />,
    'error': <Success />,
    'comment': <Comment />,
    'alert': <Alert />,
    'warning': <Warning />,
    'edit': <Edit />,
    'remove': <Remove />
  };
  notification.open({
    message: <p dangerouslySetInnerHTML={{ __html: `<font color="#172b4d"><b>[${title}]</b></font> ${content}` }} />,
    description: description,
    onClick: action,
    duration: duration,
    icon: dataIcon[type],
    className: `fwork-notification ${type}`,
  });
};
