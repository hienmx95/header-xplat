import React from 'react';
import { connect } from 'react-redux';
import { chooseCompany } from '@fwork/frontend-helper';
import { Button, Modal, Row, Col, Checkbox, Icon, Tooltip } from 'antd';
import '../../scss/company.scss';

class ModalChooseCompany extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultCompany: false,
      companyId: ''
    };
  }

  onCheckBox = (e) => {
    this.setState({
      defaultCompany: e.target.checked
    });
  }

  handleSubmit = () => {
    if (!this.state.companyId) return null;
    const params = {
      companyId: this.state.companyId,
      defaultCompany: this.state.defaultCompany
    };
    this.props.submitChooseCompany(params);
  }

  selectCompany = (id) => {
    const { companyId } = this.state;
    if (id !== companyId) {
      this.setState({
        companyId: id
      });
    }
  }

  render () {
    const {
      visible,
      handleSave,
      handleCancel,
      authUser
    } = this.props;
    const { defaultCompany, companyId } = this.state;
    const owner = authUser.companies.findIndex((item) => {
      return item.company.represent === authUser._id;
    });
    return (
      <Modal
        footer={null}
        width= "448px"
        title="Đổi công ty"
        visible={visible}
        onOk={ handleSave }
        onCancel={ handleCancel }
        className="fwork-modal"
      >
        <div className="fwork-switch-company fwork-modal-company">
          <Row type="flex" gutter={24} style={{ height: '100%', margin: 0 }}>
            <Col className="fwork-login-form" >
              <div className="fwork-login" >
                <div className="fwork-company">
                  <div>
                    {
                      (authUser.companies && authUser.companies.length) > 0
                        ? authUser.companies.filter(item => {
                          return item.status === 'enabled' && item.verifyEmailStatus === 'verified';
                        }).map((item, index) => {
                          const company = item.company;
                          const classDefault = !companyId ? (authUser.company._id === company._id ? 'choose-default' : null) : (companyId === company._id ? 'choose-default' : null);
                          return (
                            <Row key={index} className={`fwork-company-checked ${classDefault}`} onClick={() => this.selectCompany(company._id)} gutter={24} type="flex" align="middle">
                              <Col span={5} style={{ width: 80, height: 80, padding: 0 }}>
                                <img style={{ width: 80, height: 80, borderRadius: 4 }} src="https://cdn6.aptoide.com/imgs/c/e/7/ce73761775be74362b2884444a535809_icon.png?w=256" className="img-fluid" alt="" />
                              </Col>
                              <Col span={18} style={{ alignItems: 'center' }}>
                                <p className="fwork-name-company">{company.name}</p>
                                {
                                  authUser.defaultCompany === company._id
                                    ? <div style={{ display: 'flex', alignItems: 'center', paddingTop: 6 }}>
                                      <div className="fwork-dots"></div>
                                      <span className="fwork-default-company">Công ty mặc định</span>
                                    </div>
                                    : null
                                }
                              </Col>
                            </Row>
                          );
                        })
                        : null
                    }
                  </div>
                </div>
                <Checkbox onChange={this.onCheckBox} defaultChecked={defaultCompany} className="fwork-modal-checkbox">Đặt làm công ty mặc định</Checkbox>
                <div style={{ display: 'flex', height: 40, margin: '24px 0px 0px 0px' }}>
                  {
                    owner >= 0
                      ? <Tooltip title="Mỗi tài khoản chỉ có thể tạo 1 công ty !">
                        <span className="fwork-create-disable"><Icon type="plus-circle" style={{ paddingRight: 4 }}/>Tạo công ty</span>
                      </Tooltip>
                      : <a className="fwork-create-company" href={window.location.origin + '/register-company' || 'https://dev.fpt.work/register-company' }><Icon type="plus-circle" style={{ paddingRight: 4 }}/>Tạo công ty</a>
                  }
                  <Button className="fwork-company-button" type="primary" onClick={this.handleSubmit} disabled={!!((!companyId || authUser.company._id === companyId))}>Đổi công ty</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitChooseCompany: (params) => dispatch(chooseCompany(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChooseCompany);
