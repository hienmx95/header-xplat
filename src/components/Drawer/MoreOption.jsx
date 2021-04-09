import React from 'react';
import More from '../icon/More';
import ToggleNoti from '../icon/ToggleNoti';
import OffNoti from '../icon/OffNoti';
import MarkAsRead from '../icon/MarkAsRead';
import { connect } from 'react-redux';
import { fetchAPI, setCurrentUser } from '@fwork/frontend-helper';
import { openNotification } from '../notification';

class MoreOption extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef (node) {
    this.wrapperRef = node;
  }

  handleClickOutside (event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        show: false
      });
    }
  }

  showMore = () => {
    this.setState({
      show: true
    });
  };

  toggleNotification = (status) => {
    this.setState({
      show: false
    });
    const HEADER_BACKEND = process.env.REACT_APP_FWORK_API_ENDPOINT + '/header' || 'https://dev.fpt.work/api/v1/header';
    const url = 'setting';
    fetchAPI({
      baseURL: HEADER_BACKEND,
      url,
      method: 'PUT',
      body: {
        notification: status
      }
    }).then(res => {
      let message = 'Bật thông báo thành công.';
      if (!status) {
        message = 'Tắt thông báo thành công.';
      }
      openNotification('success', null, message, null, 3);
      this.props.setCurrentUser();
    }).catch(err => {
      console.error('toggleNotification:', err);
    });
  };

  markAsRead = () => {
    this.props.markAsRead();
    this.setState({
      show: false
    });
  };

  render () {
    return (
      <div ref={this.setWrapperRef}>
        <More onClick={this.showMore}/>
        {
          this.state.show ? (
            <div className="more-option-noti">
              <ul className="ant-list-items">
                <li className="ant-list-item">
                  <div className="ant-list-item-meta">
                    <MarkAsRead/>
                    <div className="ant-list-item-meta-content" onClick={this.markAsRead}>
                      <h4 className="ant-list-item-meta-title">Đánh dấu tất cả là đã đọc</h4></div>
                  </div>
                </li>
                <li className="ant-list-item">
                  {this.props.authUser.setting && this.props.authUser.setting.notification
                    ? (
                      <div className="ant-list-item-meta">
                        <OffNoti/>
                        < div className = "ant-list-item-meta-content" onClick={() => this.toggleNotification(false)}>
                          <h4 className="ant-list-item-meta-title"><b>Tắt</b> thông báo trên desktop</h4>
                        </div>
                      </div>
                    ) : (
                      <div className="ant-list-item-meta">
                        <ToggleNoti/>
                        <div className="ant-list-item-meta-content" onClick={() => this.toggleNotification(true)}>
                          <h4 className="ant-list-item-meta-title"><b>Bật</b> thông báo trên desktop</h4></div>
                      </div>
                    )
                  }
                </li>
              </ul>
            </div>
          ) : null
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { authUser } = state;
  return {
    authUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: () => dispatch(setCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreOption);
