import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import classNames from "classnames";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergyMod: false,
      topActiveTab: "1"
    };
  }

  allergyModal = () => {
    const { allergyMod } = this.state;
    this.setState({
      allergyMod: !allergyMod
    });
  };

  toggleTopNav = tab => {
    const { topActiveTab } = this.state;
    if (topActiveTab !== tab) {
      this.setState({
        topActiveTab: tab
      });
    }
  };

  render() {
    const tabPaneStyle = {
      height: "calc(100vh - 160px)"
    };
    const upcomingCardStyle = {
      height: "460px"
    };
    const boxHeader = {
      marginTop: "-10px",
      display: "block",
      textDecoration: "underline"
    };

    const { allergyMod, topActiveTab } = this.state;
    const { cp } = this.props;

    return (
      <div>
        <Row>
          <Col sm="12">
            <Nav tabs className="header-pils">
              <NavItem>
                <NavLink
                  className={classNames({
                    active: topActiveTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTopNav("1");
                  }}
                >
                  Summary
                </NavLink>
              </NavItem>
              <NavItem />
              <NavItem>
                <NavLink
                  className={classNames({
                    active: topActiveTab === "2"
                  })}
                  onClick={() => {
                    this.toggleTopNav("2");
                  }}
                >
                  List
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <div className="pt-3 body-pills">
          <TabContent
            activeTab={topActiveTab}
            className="animated fadeIn content-pills"
          >
            <TabPane tabId="1" className="animated fadeIn">
              <Row>
                <Col sm="6" style={tabPaneStyle}>
                  <Card className="box" style={upcomingCardStyle}>
                    <CardBody className="pl-2">
                      <h6 className="box-title f-s-14" style={boxHeader}>
                        Upcoming Appointments and Treatment Plans
                      </h6>
                    </CardBody>
                    <CardFooter className="box-footer">
                      <div className="float-right text-right">
                        <Button color="link">Scheduled Consultations</Button>
                        <Button color="link">Add Checkin</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col sm="6" style={tabPaneStyle}>
                  <Card className="box" style={{ minHeight: "222px" }}>
                    <CardBody className="pl-2">
                      <h6 className="box-title f-s-14" style={boxHeader}>
                        Demographics
                      </h6>
                      <div className="pt-2">
                        <table className="demog table no-border">
                          <tbody>
                            <tr>
                              <td className="demog-td">Display Name</td>
                              <td>Kennedy Peters</td>
                            </tr>
                            <tr>
                              <td className="demog-td">Address</td>
                              <td>Mombasa, Changamwe </td>
                            </tr>
                            <tr>
                              <td className="demog-td">Mobile</td>
                              <td>+254700412127</td>
                            </tr>
                            <tr>
                              <td className="demog-td">ID NO.</td>
                              <td>352436363</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="box" style={{ minHeight: "222px" }}>
                    <CardBody className="pl-2">
                      <h6 className="box-title f-s-14" style={boxHeader}>
                        Allergies
                      </h6>
                    </CardBody>
                    <CardFooter className="box-footer">
                      <div className="float-right text-right">
                        <Button onClick={this.allergyModal} color="link">
                          Add Allergy
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                  {/* Allergy Modal */}
                  <Modal
                    isOpen={allergyMod}
                    toggle={this.allergyModal}
                    backdrop="static"
                    style={{ top: "15%" }}
                    className={this.props.className}
                  >
                    <ModalHeader className="m-0">
                      <span className="modal-title f-s-14">
                        <i className="fa fa-window-maximize pr-1" />
                        Allergy - {cp.fullname}
                      </span>
                      <span>
                        <Button
                          color="link"
                          className="modal-close-x"
                          type="button"
                          onClick={this.allergyModal}
                        >
                          <i className="fa fa-times text-white" />
                        </Button>
                      </span>
                    </ModalHeader>
                    <ModalBody className="p-5">
                      <Card className="box header">
                        <CardHeader className="box-header">
                          <div>
                            <ul className="header-left">
                              <li>
                                <button
                                  className="btn-box"
                                  onClick={this.allergyModal}
                                >
                                  <i className="fa fa-save f-s-11 c-primary pr-1" />
                                  <span className="mini-title">
                                    Save &amp; Close
                                  </span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className="btn-box"
                                  onClick={this.allergyModal}
                                >
                                  <span>Cancel</span>
                                </button>
                              </li>
                              <li>
                                <button className="btn-box">
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </CardHeader>
                      </Card>
                      <div className="modal-fluid">
                        <Row>
                          <Col sm="6">
                            <div className="form-group m-r-10">
                              <label htmlFor="allergyDate">&nbsp;Date</label>
                              <select
                                id="allergyDate"
                                className="form-control form-control-xs p-t-5"
                              >
                                <option>14-Feb-2019</option>
                              </select>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group  m-l-10">
                              <label htmlFor="medic">&nbsp;Medic</label>
                              <select
                                id="medic"
                                className="form-control form-control-xs p-t-5"
                              >
                                <option>--none--</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <div className="form-group mt-2">
                              <label htmlFor="note" className="f-w-600">
                                &nbsp;Note:
                              </label>
                              <textarea
                                style={{
                                  height: "87px",
                                  padding: "0px 6px"
                                }}
                                className="form-control form-control-xs"
                                id="note"
                                placeholder="penicilin allergy"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </ModalBody>
                  </Modal>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2" className="animated fadeIn">
              we
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Dashboard;
