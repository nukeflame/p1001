import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  FormGroup,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label
} from "reactstrap";
import $ from "jquery";
import { connect } from "react-redux";
import imageUrl from "../../../config/urls/imageUrl";
import defaultAvatar from "../../../assets/avatar/defAvatar.gif";
import {
  Dashboard,
  AddImage,
  BillingData,
  PharmacyData,
  TreatmentPlan,
  DrugPrescriptions,
  Consultation,
  TimelineList
} from "./Modules";
import {
  fetchPatientCharts,
  findPatientCharts,
  setCustomizeChange
} from "../../../redux/actions/patientActions";

class PatientsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: [],
      activeTab: 1,
      activeModTab: 0,
      allergyMod: false,
      topActiveTab: "1",
      custoChartMd: false,
      addConsultationMod: false,
      dropdownOpen: false,
      patientChartsPerms: [],
      currentPatient: null
    };
  }

  toggleBox = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  customizeModal = tab => {
    const { custoChartMd } = this.state;
    if (tab) {
      this.setState({
        custoChartMd: !custoChartMd
      });
    }
  };

  toggleMiniBox = tab => {
    const { activeModTab } = this.state;
    if (activeModTab !== tab) {
      this.setState({
        activeModTab: tab
      });
    }
  };

  toggleConsModal = () => {
    const { addConsultationMod } = this.state;
    this.setState({
      addConsultationMod: !addConsultationMod
    });
  };

  handleCustomizeChange = (e, Id) => {
    const { patientChartsPerms } = this.state;
    const { user } = this.props;
    const { checked } = e.target;
    //prevent duplicates
    if (checked) {
      patientChartsPerms.push(Id);
    } else {
      patientChartsPerms.splice(patientChartsPerms.indexOf(Id), 1);
    }
    this.setState({ patientChartsPerms });
    const custData = {
      checked,
      patientChartsPerms,
      userId: user.id
    };
    this.props.setCustomizeChange(custData);
  };

  toggleDropDown = () => {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  componentDidMount() {
    const { user } = this.props;
    $("[aria-label='breadcrumb']").addClass("hidden");
    // set current patient
    const cp = JSON.parse(localStorage.getItem("cp"));
    this.state.currentPatient = cp;
    // fetch patients chart
    this.props.fetchPatientCharts();
    // find patientCharts
    this.props.findPatientCharts(user.id).then(() => {
      const { userChartPerms } = this.props;
      const { patientChartsPerms } = this.state;
      for (let i = 0; i < userChartPerms.length; i++) {
        const s = userChartPerms[i];
        patientChartsPerms.push(s.id);
      }
    });
  }

  componentWillUnmount() {
    $("[aria-label='breadcrumb']").removeClass("hidden");
  }

  render() {
    const {
      activeTab,
      activeModTab,
      custoChartMd,
      addConsultationMod,
      dropdownOpen,
      patientChartsPerms,
      currentPatient
    } = this.state;

    const { searchModal, patientCharts, userChartPerms } = this.props;

    return (
      <div className="animated fadeIn">
        {currentPatient !== null ? (
          <React.Fragment>
            <div className="mt-4">
              <div className="top-breadcumb navbar">
                {/* Patient details */}
                <Nav
                  className="d-md-down-none animated fadeIn"
                  id="patientProfile"
                  navbar
                >
                  <NavItem className="ml-3 px-1">
                    <NavLink to="/site/patient" className="nav-link">
                      <div className="profile-top">
                        {currentPatient.avatar !== null ? (
                          <img
                            src={imageUrl + currentPatient.avatar}
                            className="img-avatar"
                            alt=""
                            width="32"
                            height="32"
                          />
                        ) : (
                          <img
                            src={defaultAvatar}
                            className="img-avatar"
                            alt=""
                            width="32"
                            height="32"
                          />
                        )}
                      </div>
                    </NavLink>
                  </NavItem>
                  <NavItem className="bold pr-2">
                    <span className="f-s-14">{currentPatient.fullname}</span>
                  </NavItem>
                  <NavItem className="text-muted">
                    {currentPatient.gender},
                  </NavItem>
                  <NavItem className="text-muted">
                    {currentPatient.age}yrs
                  </NavItem>
                  <NavItem className="m-l-7">
                    <ButtonDropdown
                      isOpen={dropdownOpen}
                      toggle={this.toggleDropDown}
                    >
                      <DropdownToggle color="link">
                        <span className="c-primary"> More...</span>
                      </DropdownToggle>
                      <DropdownMenu right className="top-dropdown">
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Print BarCode</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </NavItem>
                </Nav>
              </div>
            </div>
            {/* section layout */}
            <Row>
              <Col sm="2">
                <ListGroup id="list-tab" role="tablist" className="mini-side">
                  {userChartPerms && userChartPerms.length > 0
                    ? userChartPerms.map(c => (
                        <React.Fragment key={c.id}>
                          <ListGroupItem
                            onClick={() => this.toggleBox(c.id)}
                            action
                            active={activeTab === c.id}
                          >
                            {c.name}
                          </ListGroupItem>
                          {c.divider ? <span className="hr-line" /> : null}
                        </React.Fragment>
                      ))
                    : null}
                  <ListGroupItem
                    onClick={() => this.customizeModal(17)}
                    action
                    active={activeTab === 17}
                  >
                    Customize Chart
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col sm="10">
                <TabContent className="tab-box" activeTab={activeTab}>
                  <TabPane tabId={1} className="animated fadeIn">
                    <Dashboard {...this.props} cp={currentPatient} />
                  </TabPane>
                  <TabPane tabId={2} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <div className="header-pils">
                          <Button
                            className="active"
                            color="link"
                            onClick={() => this.togglePill(0)}
                            // active={activeTab === 0}
                          >
                            Medical History
                          </Button>
                          <Button color="link btn-muted">
                            Surgical History
                          </Button>
                          <Button color="link btn-muted">Social History</Button>
                          <Button color="link btn-muted">Family History</Button>
                        </div>
                      </Col>
                    </Row>
                    <Card className="box" style={{ minHeight: "1000px" }}>
                      <Row>
                        <Col sm="6">
                          <p className="p-history ">Alcohol use</p>
                          <p className="p-history">Tobbacol use</p>
                          <p className="p-history">Caffeine use</p>
                          <p className="p-history">Drug use</p>
                        </Col>
                        <Col sm="6">
                          <p className="p-history">Exercise</p>
                          <p className="p-history">Sleep</p>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane tabId={3} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button
                                    className="btn-box"
                                    onClick={this.toggleConsModal}
                                  >
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      Add Consultation
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-print  pr-1" />
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-settings" />
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                          <div className="container mt-2 mb-2">
                            <div className="row">
                              <div className="col-md-12">
                                <ul className="timeline">
                                  <TimelineList />
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={4} className="animated fadeIn">
                    4
                  </TabPane>
                  <TabPane tabId={5} className="animated fadeIn">
                    5
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button
                                    className="btn-box"
                                    onClick={this.toggleConsModal}
                                  >
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      Add Consultation
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <Input
                                    placeholder="Type the medic"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <Input
                                    placeholder="Type the patient"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <select className="form-control header-control pt-1">
                                    <option>All Time</option>
                                    <option>1</option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={6} className="animated fadeIn">
                    <Consultation {...this.props} cp={currentPatient} />
                  </TabPane>
                  <TabPane tabId={7} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button
                                    className="btn-box"
                                    onClick={this.toggleConsModal}
                                  >
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      Add Consultation
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <select className="form-control header-control pt-1">
                                    <option>All Time</option>
                                    <option>1</option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={8} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      Add Patient Document
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      Capture Pdf
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={9} className="animated fadeIn">
                    <AddImage />
                  </TabPane>
                  <TabPane tabId={10} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      New Lab Request
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <Input
                                    placeholder="Type the medic"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <Input
                                    placeholder="Type the patient"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <select className="form-control header-control pt-1">
                                    <option>All Time</option>
                                    <option>1</option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={11} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      New Lab Request
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <Input
                                    placeholder="Type the medic"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <Input
                                    placeholder="Type the patient"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <select className="form-control header-control pt-1">
                                    <option>All Time</option>
                                    <option>1</option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={12} className="animated fadeIn">
                    <Row>
                      <Col sm="12">
                        <Card className="box">
                          <CardHeader className="box-header">
                            <div>
                              <ul className="header-left">
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-plus c-primary pr-1" />
                                    <span className="mini-title">
                                      New Lab Request
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Edit</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <span>Delete</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="btn-box">
                                    <i className="fa fa-search  pr-1" />
                                    <span>Search</span>
                                  </button>
                                </li>
                              </ul>
                              <ul className="header-right">
                                <li>
                                  <Input
                                    placeholder="Type the medic"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <Input
                                    placeholder="Type the patient"
                                    className="header-control"
                                  />
                                </li>
                                <li>
                                  <select className="form-control header-control pt-1">
                                    <option>All Time</option>
                                    <option>1</option>
                                  </select>
                                </li>
                              </ul>
                            </div>
                          </CardHeader>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={13} className="animated fadeIn">
                    <DrugPrescriptions />
                  </TabPane>
                  <TabPane tabId={14} className="animated fadeIn">
                    <TreatmentPlan />
                  </TabPane>
                  <TabPane tabId={15} className="animated fadeIn">
                    <BillingData {...this.props} />
                  </TabPane>
                  <TabPane tabId={16} className="animated fadeIn">
                    <PharmacyData />
                  </TabPane>
                </TabContent>
                {/* Customize Chart Modal */}
                <Modal
                  isOpen={custoChartMd}
                  toggle={this.customizeModal}
                  className={"top-10 " + this.props.className}
                >
                  <ModalHeader className="m-0">
                    <span className="modal-title f-s-14">
                      <i className="fa fa-edit pr-1" />
                      Customize
                    </span>
                    <span>
                      <Button
                        color="link"
                        className="modal-close-x"
                        type="button"
                        onClick={this.customizeModal}
                      >
                        <i className="fa fa-times text-white" />
                      </Button>
                    </span>
                  </ModalHeader>
                  <ModalBody className="bg2">
                    <h4 className="f-s-16">Menus</h4>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col sm="12">
                            {patientCharts && patientCharts.length > 0
                              ? patientCharts.map(c => (
                                  <FormGroup check key={c.id}>
                                    <div className="custom-control custom-checkbox pl-0">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={c.slug}
                                        name={c.slug}
                                        checked={
                                          patientChartsPerms.includes(c.id)
                                            ? true
                                            : false
                                        }
                                        onChange={e =>
                                          this.handleCustomizeChange(e, c.id)
                                        }
                                      />
                                      <label
                                        className="custom-control-label bold"
                                        htmlFor={c.slug}
                                      >
                                        {c.name}
                                      </label>
                                    </div>
                                  </FormGroup>
                                ))
                              : null}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </ModalBody>
                </Modal>

                {/* Add Consultation Modal */}
                <Modal
                  isOpen={addConsultationMod}
                  toggle={this.toggleConsModal}
                  className={"modal-lg " + this.props.className}
                >
                  <ModalHeader className="m-0">
                    <span className="text-muted f-s-14">
                      <i className="fa fa-edit" /> Consultation - Kennedy Peters
                    </span>
                  </ModalHeader>
                  <ModalBody>
                    <Card className="box header">
                      <CardHeader className="box-header">
                        <div>
                          <ul className="header-left">
                            <li>
                              <button
                                className="btn-box"
                                onClick={this.toggleConsModal}
                              >
                                <i className="fa fa-save f-s-11 c-primary pr-1" />
                                <span className="mini-title">
                                  Save and Close
                                </span>
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn-box"
                                onClick={this.toggleConsModal}
                              >
                                <span>Close</span>
                              </button>
                            </li>
                            <li>
                              <button className="btn-box">
                                <span>Layout</span>
                              </button>
                            </li>
                            <li>
                              <button className="btn-box">
                                <i className="fa fa-print  pr-1" />
                                <span>Print</span>
                              </button>
                            </li>
                            <li>
                              <button className="btn-box">
                                <span>More...</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </CardHeader>
                    </Card>
                    <div className="modal-fluid">
                      <Row>
                        <Col sm="4" className="sidel-bg">
                          <div>
                            <div className="form-group">
                              <label htmlFor="allergyDate">&nbsp;Date</label>
                              <select
                                id="allergyDate"
                                className="form-control form-control-xs p-t-5"
                              >
                                <option>14-Feb-2019</option>
                              </select>
                            </div>
                            <div className="form-group  ">
                              <label htmlFor="medic">&nbsp;Medic</label>
                              <select
                                id="medic"
                                className="form-control form-control-xs p-t-5"
                              >
                                <option>--none--</option>
                              </select>
                            </div>
                            <div className="form-group  ">
                              <label htmlFor="location">&nbsp;Location</label>
                              <Input
                                id="location"
                                className="form-control form-control-xs"
                              />
                            </div>
                          </div>
                          <div className="p-3">
                            <ListGroup
                              id="list-tab"
                              role="tablist"
                              className="mini-side"
                            >
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(0)}
                                action
                                active={activeModTab === 0}
                              >
                                <span>Content</span>
                              </ListGroupItem>
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(1)}
                                action
                                active={activeModTab === 1}
                              >
                                Review of Systems
                              </ListGroupItem>
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(2)}
                                action
                                active={activeModTab === 2}
                              >
                                Vitals
                              </ListGroupItem>
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(3)}
                                action
                                active={activeModTab === 3}
                              >
                                Physical Exam
                              </ListGroupItem>
                              <span className="hr-line" />
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(4)}
                                action
                                active={activeModTab === 4}
                              >
                                Lab Requests
                              </ListGroupItem>
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(5)}
                                action
                                active={activeModTab === 5}
                              >
                                Image Requests
                              </ListGroupItem>
                              <span className="hr-line" />
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(6)}
                                action
                                active={activeModTab === 6}
                              >
                                Documents
                              </ListGroupItem>
                              <span className="hr-line" />
                              <ListGroupItem
                                onClick={() => this.toggleMiniBox(7)}
                                action
                                active={activeModTab === 7}
                              >
                                Billing
                              </ListGroupItem>
                            </ListGroup>
                          </div>
                          <div
                            className="pb-4 f-s-11"
                            style={{ marginTop: "4.5rem" }}
                          >
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id="medication"
                                name="medication"
                                value="1"
                                checked
                              />
                              <Label
                                className="form-check-label"
                                check
                                htmlFor="medication"
                              >
                                Bill Medcation
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                        <Col sm="8" className="sider-bg">
                          <TabContent
                            className="tab-box"
                            activeTab={activeModTab}
                          >
                            <TabPane tabId={0} className="animated fadeIn">
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="tile" className="pt-1">
                                    Title
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <FormGroup>
                                    <Input
                                      id="tile"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="tile" className="pt-1">
                                    Tags
                                  </Label>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <Input
                                      id="tile"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the tag and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="condition" className="pt-1">
                                    Condition
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <FormGroup>
                                    <select
                                      id="condition"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option>E</option>
                                    </select>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="complaint" className="pt-1">
                                    Complaint
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <FormGroup>
                                    <Input
                                      id="complaint"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the tag and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="complaint" className="pt-1">
                                    Clinical Findings
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <FormGroup>
                                    <Input
                                      id="complaint"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the clinical finding and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="complaint" className="pt-1">
                                    Paraclinical Findings
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <FormGroup>
                                    <Input
                                      id="complaint"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the paraclinical finding and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="diagnosis" className="pt-1">
                                    Diagnoses
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <FormGroup>
                                    <Input
                                      id="diagnosis"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the diagnosis and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="treatments" className="pt-1">
                                    Treatments
                                  </Label>
                                </Col>
                                <Col sm="8">
                                  <FormGroup>
                                    <Input
                                      id="treatments"
                                      className="form-control form-control-xs f-s-10"
                                      placeholder="Type the treatment and press Enter"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="medication" className="pt-1">
                                    Medcation
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <Row>
                                    <Col sm="8">
                                      <FormGroup>
                                        <Input
                                          id="medication"
                                          className="form-control form-control-xs f-s-10"
                                          placeholder="Drug name from inventory"
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col sm="4">
                                      <Row>
                                        <Col sm="4">
                                          <Label
                                            htmlFor="refils"
                                            className="pt-1 m-l-21"
                                          >
                                            Refils
                                          </Label>
                                        </Col>
                                        <Col sm="8">
                                          <FormGroup>
                                            <Input
                                              id="refils"
                                              value="1"
                                              style={{
                                                marginLeft: "-30px"
                                              }}
                                              className="form-control form-control-xs f-s-10"
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col sm="8">
                                      <Row>
                                        <Col sm="4">
                                          <FormGroup className="m-r-24">
                                            <Input
                                              id="medication"
                                              className="form-control form-control-xs f-s-10"
                                              placeholder="Dosage"
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                          <FormGroup className="m-r-24">
                                            <Input
                                              id="medication"
                                              className="form-control form-control-xs f-s-10"
                                              placeholder="Application"
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col sm="4">
                                          <FormGroup>
                                            <Input
                                              id="medication"
                                              className="form-control form-control-xs f-s-10"
                                              placeholder="Frequency"
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col sm="4">
                                      <Row>
                                        <Col sm="4">
                                          <FormGroup>
                                            <Input
                                              style={{
                                                width: "63px"
                                              }}
                                              id="medication"
                                              className="form-control form-control-xs f-s-10 m-l-20"
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col sm="8">
                                          <FormGroup>
                                            <select
                                              id="days"
                                              className="form-control form-control-xs f-s-10"
                                            >
                                              <option>days</option>
                                              <option>weeks</option>
                                              <option>months</option>
                                              <option>years</option>
                                            </select>
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col sm="12">
                                      <FormGroup>
                                        <Input
                                          id="notes"
                                          className="form-control form-control-xs f-s-10"
                                          placeholder="Notes"
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>

                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="materials" className="pt-1">
                                    Materials
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <FormGroup>
                                    <Input
                                      id="materials"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col sm="2">
                                  <Label htmlFor="surgeries" className="pt-1">
                                    Surgeries
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <FormGroup>
                                    <Input
                                      id="surgeries"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col sm="2">
                                  <Label
                                    htmlFor="recomendations"
                                    className="pt-1"
                                  >
                                    Recomend
                                  </Label>
                                </Col>
                                <Col sm="10">
                                  <FormGroup>
                                    <Input
                                      id="recomendations"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm="12">
                                  <FormGroup>
                                    <div>
                                      <Label
                                        htmlFor="details"
                                        className="p-t-5"
                                      >
                                        Details
                                      </Label>
                                      <span className="float-right">
                                        <Button color="link" className="f-s-11">
                                          Insert Questionaire
                                        </Button>
                                      </span>
                                    </div>

                                    <textarea
                                      id="details"
                                      className="form-control form-control-xs"
                                      style={{
                                        height: "90px",
                                        marginTop: "-5px"
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId={1} className="animated fadeIn">
                              <div>
                                <h6 className="f-s-13 f-w-600">
                                  Review of Systems
                                </h6>
                              </div>
                              <Row>
                                <Col sm="6">
                                  <h6 className="f-s-13 f-w-600">General</h6>
                                  <FormGroup>
                                    <Label htmlFor="fatigue" className="mb-0">
                                      Fatigue
                                    </Label>
                                    <select
                                      id="fatigue"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="fevers" className="mb-0">
                                      Fevers
                                    </Label>
                                    <select
                                      id="fevers"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="headache" className="mb-0">
                                      Headache
                                    </Label>
                                    <select
                                      id="headache"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="wloss" className="mb-0">
                                      Weight Loss
                                    </Label>
                                    <select
                                      id="wloss"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="other1" className="mb-0">
                                      Other
                                    </Label>
                                    <Input
                                      id="other1"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <h6 className="f-s-13 f-w-600">
                                    Cardiovascular
                                  </h6>
                                  <FormGroup>
                                    <Label htmlFor="cpain" className="mb-0">
                                      Chest pain
                                    </Label>
                                    <select
                                      id="cpain"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="dbreath" className="mb-0">
                                      Difficult Breathing
                                    </Label>
                                    <select
                                      id="dbreath"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="palp" className="mb-0">
                                      Palpitations
                                    </Label>
                                    <select
                                      id="palp"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="swelling" className="mb-0">
                                      Swelling
                                    </Label>
                                    <select
                                      id="swelling"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="other2" className="mb-0">
                                      Other
                                    </Label>
                                    <Input
                                      id="other2"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId={2} className="animated fadeIn">
                              <div>
                                <h6 className="f-s-13 f-w-600">Vitals</h6>
                              </div>
                              <Row>
                                <Col sm="6">
                                  <FormGroup>
                                    <Label htmlFor="bps" className="mb-0">
                                      BP Systolic
                                    </Label>
                                    <select
                                      id="bps"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="bpd" className="mb-0">
                                      BP Distolic
                                    </Label>
                                    <select
                                      id="bpd"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="bps" className="mb-0">
                                      Pulse
                                    </Label>
                                    <select
                                      id="pulse"
                                      className="form-control form-control-xs f-s-10"
                                    >
                                      <option />
                                      <option />
                                    </select>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <Label htmlFor="temp" className="mb-0">
                                      Temperature
                                    </Label>
                                    <Input
                                      id="bps"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="weight" className="mb-0">
                                      Weight
                                    </Label>
                                    <Input
                                      id="weight"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                  <FormGroup>
                                    <Label htmlFor="height" className="mb-0">
                                      Height
                                    </Label>
                                    <Input
                                      id="height"
                                      className="form-control form-control-xs f-s-10"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId={3} className="animated fadeIn">
                              <div>
                                <h6 className="f-s-13 f-w-600">
                                  Physical Exam
                                </h6>
                              </div>
                              <div>
                                <FormGroup>
                                  <Label htmlFor="gen" className="mb-0">
                                    General
                                  </Label>
                                  <select
                                    id="gen"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="head" className="mb-0">
                                    Head
                                  </Label>
                                  <select
                                    id="head"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="eyes" className="mb-0">
                                    Eyes
                                  </Label>
                                  <select
                                    id="eyes"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="ears" className="mb-0">
                                    Ears
                                  </Label>
                                  <select
                                    id="ears"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="nose" className="mb-0">
                                    Nose
                                  </Label>
                                  <select
                                    id="nose"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="mnt" className="mb-0">
                                    Mouth and Throat
                                  </Label>
                                  <select
                                    id="mnt"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="neck" className="mb-0">
                                    Neck
                                  </Label>
                                  <select
                                    id="neck"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="breasts" className="mb-0">
                                    Breasts
                                  </Label>
                                  <select
                                    id="breasts"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="gatsro" className="mb-0">
                                    Gastrointestinal
                                  </Label>
                                  <select
                                    id="gatsro"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="gent" className="mb-0">
                                    Genitourinary
                                  </Label>
                                  <select
                                    id="gent"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="neur" className="mb-0">
                                    Neurologic
                                  </Label>
                                  <select
                                    id="neur"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="psy" className="mb-0">
                                    Psyhiatric
                                  </Label>
                                  <select
                                    id="psy"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option />
                                    <option />
                                  </select>
                                </FormGroup>
                              </div>
                            </TabPane>
                            <TabPane tabId={4} className="animated fadeIn">
                              helo
                            </TabPane>
                            <TabPane tabId={5} className="animated fadeIn">
                              helo am 1
                            </TabPane>
                            <TabPane tabId={6} className="animated fadeIn">
                              <Card className="box header">
                                <CardHeader className="box-header bg1">
                                  <div>
                                    <ul className="header-left">
                                      <li>
                                        <button className="btn-box">
                                          <i className="fa fa-plus c-primary pr-1" />
                                          <span className="mini-title">
                                            Add Image or File
                                          </span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="btn-box">
                                          <span>Capture Image</span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="btn-box">
                                          <span>Edit</span>
                                        </button>
                                      </li>
                                      <li>
                                        <button className="btn-box">
                                          <span>Detach</span>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </CardHeader>
                              </Card>
                            </TabPane>
                            <TabPane tabId={7} className="animated fadeIn">
                              <div>
                                <h6 className="f-s-11 f-w-400">
                                  Billable Items
                                </h6>
                              </div>
                              <Row>
                                <Col sm="8">
                                  <Row>
                                    <Col sm="6">
                                      <FormGroup check inline className="pt-1">
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="billon"
                                          value="1"
                                        />
                                        <Label
                                          className="form-check-label f-s-10"
                                          check
                                          htmlFor="billon"
                                        >
                                          Bill On:
                                        </Label>
                                      </FormGroup>
                                      <FormGroup check inline className="pt-1">
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="invdrug"
                                          value="1"
                                        />
                                        <Label
                                          className="form-check-label f-s-10"
                                          check
                                          htmlFor="invdrug"
                                        >
                                          Invoice Drugs on:
                                        </Label>
                                      </FormGroup>
                                      <FormGroup check inline className="pt-1">
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="invlab"
                                          value="1"
                                        />
                                        <Label
                                          className="form-check-label f-s-10"
                                          check
                                          htmlFor="invlab"
                                        >
                                          Invoice Lab on:
                                        </Label>
                                      </FormGroup>
                                      <FormGroup check inline className="pt-1">
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="invimg"
                                          value="1"
                                        />
                                        <Label
                                          className="form-check-label f-s-10"
                                          check
                                          htmlFor="invimg"
                                        >
                                          Invoice Imaging on:
                                        </Label>
                                      </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                      <FormGroup>
                                        <select
                                          id="bilon"
                                          className="form-control form-control-xs f-s-10"
                                        >
                                          <option>14-Feb-2019</option>
                                        </select>
                                      </FormGroup>
                                      <FormGroup>
                                        <select
                                          id="bilon"
                                          className="form-control form-control-xs f-s-10"
                                        >
                                          <option>14-Feb-2019</option>
                                        </select>
                                      </FormGroup>
                                      <FormGroup>
                                        <select
                                          id="bilon"
                                          className="form-control form-control-xs f-s-10"
                                        >
                                          <option>14-Feb-2019</option>
                                        </select>
                                      </FormGroup>
                                      <FormGroup>
                                        <select
                                          id="bilon"
                                          className="form-control form-control-xs f-s-10"
                                        >
                                          <option>14-Feb-2019</option>
                                        </select>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </Row>
                    </div>
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Row>
            <Col sm="12">
              <div className="empty-view">
                <div className="empty-center">
                  <div className="f-s-14">
                    This view is empty because there is no patient selected in
                    the chart
                  </div>
                  <Button color="link" onClick={e => searchModal(e)}>
                    Search Patient
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentPatient: state.patients.currentPatient,
  patientCharts: state.patients.patientCharts,
  userChartPerms: state.patients.userChartPerms
});

const mapDispatchToProps = {
  fetchPatientCharts,
  findPatientCharts,
  setCustomizeChange
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsChart);
