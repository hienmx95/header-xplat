import React from 'react';
import NoData from '../icon/NoData';

export default function NoNotification (props) {
  return (
    <div className="no-notification">
      <NoData />
      <p>Bạn không có thông báo nào!</p>
    </div>
  );
}
