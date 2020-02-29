import React, { Component } from "react";
import {
  Card,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  CardHeader,
  Col,
  Row,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Input,
  Label,
  ButtonDropdown,
  Nav,
  NavItem,
  NavLink,
  Form,
  TabContent,
  TabPane
} from "reactstrap";
import { connect } from "react-redux";
import {
  fetchPatients,
  createPatient,
  destroyPatient
} from "../../../redux/actions/patientActions";
import { createQueue } from "../../../redux/actions/queueActions";
import ReactTable from "react-table";
import PatientDetails from "./PatientDetails";
import Payer from "./Payer";
import moment from "moment";
import Noty from "noty";
import classNames from "classnames";
import Swal from "sweetalert2";

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPatients: false,
      delPtMod: false,
      patientMod: false,
      queueMod: false,
      schemeMod: false,
      showSearchBar: false,
      dropdownOpen: false,
      webcamData: {
        webcamMod: false,
        enableWebcam: false,
        errorDevice: false,
        facingMode: { exact: "environment" },
        imageName: "",
        sampleImage: ""
      },
      activePatient: "1",
      activeNav: new Array(4).fill("1"),
      selectedRows: [],
      selectedTd: "",
      activePatients: "1",
      patientData: {
        id: "",
        avatar: null,
        surname: "",
        othernames: "",
        telephone: "",
        nationality: "",
        phone: "",
        email: "",
        idType: "",
        days: "0",
        months: "0",
        years: "0",
        occupation: "0",
        idNo: "",
        refNo: "",
        residence: "",
        town: "0",
        postalAddress: "",
        emergRelation: "",
        emergName: "",
        emergContacts: "",
        postalCode: "",
        streetRoad: "",
        loc: ""
      },
      queueData: {
        patientId: "",
        patientNo: "",
        surname: "",
        otherNames: "",
        opNo: "",
        age: "",
        from: "Administrator",
        to: "",
        scheme: "Cash Payers",
        clinic: "General Outpatient",
        note: "",
        printTicket: false,
        isEmergency: false
      }
    };
  }

  togglePatientModal = () => {
    const { patientMod } = this.state;
    this.setState({
      patientMod: !patientMod,
      activeNav: new Array(7).fill("1")
    });
  };

  toggleDropDown = () => {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  toggleNav = (tabPane, tab) => {
    const newArray = this.state.activeNav.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeNav: newArray
    });
  };

  // handle input change
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      patientData: {
        ...prevState.patientData,
        [name]: value
      }
    }));
  };

  // handle datepicker change
  handleChangeDate = date => {
    this.setState(prevState => ({
      patientData: {
        ...prevState.patientData,
        dob: date
      }
    }));
  };

  // toogle camera
  startWebcamToggle = e => {
    e.preventDefault();
    const { webcamMod } = this.state.webcamData;
    this.setState(prevState => ({
      webcamData: {
        ...prevState.webcamData,
        webcamMod: !webcamMod,
        enableWebcam: false,
        imageName: ""
      },
      patientData: {
        ...prevState.patientData,
        avatar: null
      }
    }));
  };

  // enable cam fn
  handleEnableWebcam = () => {
    const { enableWebcam } = this.state.webcamData;
    this.setState(prevState => ({
      webcamData: {
        ...prevState.webcamData,
        enableWebcam: !enableWebcam
      }
    }));
  };

  // set webcam reference
  websetRef = webcam => {
    this.webcam = webcam;
  };

  // set browse file reference
  browseRefImg = browseImg => {
    this.browseImg = browseImg;
  };

  // btn upload manual
  handleUploadImage = e => {
    e.preventDefault();
    this.browseImg.click();
  };

  //file change
  handleFileChange = e => {
    e.persist();
    let reader,
      file = this.browseImg.files[0];

    if (file.length === 0) {
      return;
    }

    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.setState(prevState => ({
        patientData: {
          ...prevState.patientData,
          avatar: e.target.result
        }
      }));
    };
  };

  // capture image
  captureImage = () => {
    const imageSrc = this.webcam.getScreenshot();

    this.setState(prevState => ({
      webcamData: {
        ...prevState.webcamData,
        imageName: `IMG_${moment().format("Ymd_h:m:s")}.jpg`,
        sampleImage: imageSrc
      }
    }));
  };

  saveCapture = () => {
    const { sampleImage } = this.state.webcamData;
    this.setState(prevState => ({
      patientData: {
        ...prevState.patientData,
        avatar: sampleImage
      },
      webcamData: {
        ...prevState.webcamData,
        webcamMod: false,
        enableWebcam: false,
        sampleImage: ""
      }
    }));
  };

  // camera layout
  handleCameraView = e => {
    let val = e.target.value;
    if (val === "user") {
      this.setState(prevState => ({
        webcamData: {
          ...prevState.webcamData,
          facingMode: "user",
          sampleImage: ""
        }
      }));
    } else if (val === "environment") {
      this.setState(prevState => ({
        webcamData: {
          ...prevState.webcamData,
          facingMode: { exact: "environment" },
          sampleImage: ""
        }
      }));
    }
  };

  // remove img
  eraseImage = e => {
    this.setState(prevState => ({
      webcamData: {
        ...prevState.webcamData,
        imageSrc: "",
        sampleImage: ""
      },
      patientData: {
        ...prevState.patientData,
        avatar: null
      }
    }));
  };

  // scheme modal
  schemeModal = e => {
    e.preventDefault();
    const { schemeMod } = this.state;
    this.setState({
      schemeMod: !schemeMod
    });
  };

  //handle forward to doctor
  savePatient = e => {
    e.preventDefault();
    const _this = this;
    // process data to database
    this.setState({ saveProcessing: true });
    this.props.createPatient(this.state.patientData);
    // .then(res => {
    // console.log(res.data);

    // this.setState({ saveProcessing: false, patientMod: false });

    // const v = new Noty({
    //   text: patient.fullnames,
    //   layout: "topRight",
    //   type: "success",
    //   theme: "metroui",
    //   buttons: [
    //     Noty.button(
    //       "Queue this Patient <i class='fas fa-hand-point-right f-s-13'/>",
    //       "btn btn-info btn-sm btn-square",
    //       function() {
    //         _this.setState(prevState => ({
    //           queueData: {
    //             ...prevState.queueData,
    //             surname: patient.surname,
    //             otherNames: patient.otherNames,
    //             opNo: patient.patientNo,
    //             age: patient.age
    //           }
    //         }));

    //         _this.setState({ queueMod: true });
    //         v.close();
    //       }
    //     )
    //   ]
    // }).show();
    // })
    // .catch(error => {
    //   console.log(error);

    //   this.setState({ saveProcessing: false });
    // });

    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "top",
    //   showConfirmButton: false,
    //   timer: 5000
    // });
    // Toast.fire({
    //   type: "success",
    //   title: "New Patient Saved!"
    // });

    // if (patient.charges === null) {
    //   var n = new Noty({
    //     text: "Do you wish to add a scheme for the patient?",
    //     layout: "topCenter",
    //     theme: "metroui",
    //     buttons: [
    //       Noty.button(
    //         "Yes",
    //         "btn btn-success btn-sm btn-square mr-2",
    //         function() {
    //           _this.setState({
    //             patientMod: true,
    //             activeNav: new Array(4).fill("3")
    //           });
    //           _this.setState({ schemeMod: true });
    //           n.close();
    //         },
    //         { id: "button1", "data-status": "ok" }
    //       ),

    //       Noty.button("No", "btn btn-error", function() {
    //         n.close();

    //         const v = new Noty({
    //           text: patient.fullnames,
    //           layout: "topRight",
    //           type: "success",
    //           theme: "metroui",
    //           buttons: [
    //             Noty.button(
    //               "Queue this Patient <i class='fas fa-hand-point-right f-s-13'/>",
    //               "btn btn-info btn-sm btn-square",
    //               function() {
    //                 _this.setState({ queueMod: true });
    //                 v.close();
    //               }
    //             )
    //           ]
    //         }).show();
    //       })
    //     ]
    //   });

    //   n.show();
    // } else {
    //   const v = new Noty({
    //     text: patient.fullnames,
    //     layout: "topRight",
    //     type: "success",
    //     theme: "metroui",
    //     buttons: [
    //       Noty.button(
    //         "Queue this Patient <i class='fas fa-hand-point-right f-s-13'/>",
    //         "btn btn-info btn-sm btn-square",
    //         function() {
    //           _this.setState(prevState => ({
    //             queueData: {
    //               ...prevState.queue,
    //               surname: patient.surname,
    //               otherNames: patient.otherNames,
    //               opNo: patient.opNo,
    //               age: patient.age
    //             }
    //           }));

    //           _this.setState({ queueMod: true });
    //           v.close();
    //         }
    //       )
    //     ]
    //   }).show();
    // }
  };

  delPatientModal = e => {
    e.preventDefault();
    const { delPtMod } = this.state;
    this.setState({
      delPtMod: !delPtMod
    });
  };

  delPatient = () => {
    const { selectedRows } = this.state;
    this.props.destroyPatient(selectedRows);
    this.setState({
      delPtMod: false,
      selected: null
    });
  };

  handleSearchBar = () => {
    const { showSearchBar } = this.state;
    this.setState({
      showSearchBar: !showSearchBar
    });
  };

  handleImport = () => {
    console.log("object");

    new Noty({
      timeout: 2500,
      type: "success",
      layout: "topCenter",
      text: "<span>Saved</span>"
    }).show();
  };

  handleSelectedSearch = (e, props) => {
    e.preventDefault();
    const data = {
      id: props.id,
      fullname: props.fullname,
      age: props.age,
      gender: props.gender,
      avatar: props.avatar
    };
    localStorage.setItem("cp", JSON.stringify(data));
    this.props.history.push("/records/patientChart");
  };

  editPatient = e => {
    e.preventDefault();
    const { selectedRows } = this.state;
    if (selectedRows.length > 0) {
      const p = selectedRows[0];

      this.setState(prevState => ({
        patientData: {
          ...prevState.patientData,
          avatar: null,
          surname: p.surname,
          othernames: p.otherNames,
          telephone: p.telephone,
          nationality: p.nationality,
          phone: p.phone,
          email: p.email,
          idType: p.idType,
          days: p.days,
          months: p.months,
          years: p.years,
          occupation: p.occupation,
          idNo: p.idNo,
          refNo: p.refNo,
          residence: p.residence,
          town: p.town,
          postalAddress: p.postalAddress,
          emergRelation: p.emergRelation,
          emergName: p.emergName,
          emergContacts: p.emergContacts,
          postalCode: p.postalCode,
          streetRoad: p.streetRoad,
          loc: p.location
        }
      }));
    }

    this.setState({ patientMod: true });
  };

  queuePatientClose = () => {
    this.setState({ queueMod: false });
  };

  queuePatient = e => {
    e.preventDefault();
    const { selectedRows } = this.state;
    const pt = selectedRows[0];
    console.log(pt);

    this.setState(prevState => ({
      queueData: {
        ...prevState.queue,
        patientId: pt.id,
        patientNo: pt.patientNo,
        surname: pt.surname,
        otherNames: pt.otherNames,
        opNo: pt.patientNo,
        age: pt.age
      }
    }));

    this.setState({ queueMod: true });
  };

  saveQueuePatient = () => {
    const { queueData } = this.state;
    this.props.createQueue(queueData);

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 5000
    });
    Toast.fire({
      type: "success",
      title: "Patient Queued!"
    });

    this.setState({ queueMod: false });
  };

  handleQueueChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      queueData: {
        ...prevState.queueData,
        [name]: value
      }
    }));
  };

  handleQueueCheck = e => {
    const { name, checked } = e.target;
    this.setState(prevState => ({
      queueData: {
        ...prevState.queueData,
        [name]: checked
      }
    }));
  };

  componentDidMount() {
    // fetch patients
    this.setState({ loadPatients: true });
    this.props
      .fetchPatients()
      .then(() => {
        this.setState({ loadPatients: false });
      })
      .catch(() => {
        this.setState({ loadPatients: false });
      });
  }

  render() {
    const {
      patientMod,
      activeNav,
      patientData,
      webcamData,
      selectedRows,
      delPtMod,
      dropdownOpen,
      showSearchBar,
      activePatient,
      loadPatients,
      queueMod,
      schemeMod,
      queueData
    } = this.state;

    const { patients, departments, saveProcessing } = this.props;

    const patientCol = [
      {
        Header: "Patient No.",
        accessor: "patientNo",
        minWidth: 40
      },
      {
        Header: "Patient",
        accessor: "surname",
        minWidth: 130,
        Cell: props => (
          <a
            href="/records/patient-chart"
            onClick={e => this.handleSelectedSearch(e, props.original)}
          >
            <span className="bold p-r-3">{props.value}</span>
            {props.original.otherNames}
          </a>
        )
      },
      {
        Header: "Age",
        accessor: "age",
        minWidth: 50
      },
      {
        Header: "I.D No.",
        accessor: "idNo",
        minWidth: 90
      },
      {
        Header: "Address",
        accessor: "adress",
        minWidth: 150,
        Cell: props => (
          <span>
            {props.original.residence} - {props.original.town.name}
          </span>
        )
      },

      {
        Header: "Entry Date",
        accessor: "entryDate",
        minWidth: 150
      },
      {
        Header: "Served By",
        accessor: "regUser.fullname"
      }
    ];

    const chemeData = [
      {
        schemeName: "NHIF Outpatient",
        membershipNo: "27343838",
        isPrinciple: "Yes",
        princMember: "Memenr"
      }
    ];

    const schemeCol = [
      {
        Header: "Scheme Name",
        accessor: "schemeName",
        minWidth: 200
      },
      {
        Header: "Principal Member",
        accessor: "princMember"
      },
      {
        Header: "Membership No.",
        accessor: "membershipNo"
      },
      {
        Header: "Is Principal Member",
        accessor: "isPrinciple"
      }
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <div className="navitem-header pb-2">
              <Nav tabs className="header-pils">
                <NavItem>
                  <NavLink
                    className={
                      "pl-0 disabled " +
                      classNames({
                        active: activePatient === "1"
                      })
                    }
                  >
                    <i className="fa fa-user-plus nav-ico pr-1" />
                    <span className="nav-title">Patient Registry</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card className="box">
              <CardHeader className="box-header">
                <Row>
                  <Col sm="10">
                    <ul className="header-left">
                      <li>
                        <button
                          className="btn-box"
                          type="button"
                          onClick={this.togglePatientModal}
                        >
                          <i className="fa fa-plus c-primary" />
                          <span className="mini-title">New Patient</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-box"
                          type="button"
                          onClick={this.editPatient}
                          disabled={
                            selectedRows && selectedRows.length === 1
                              ? false
                              : true
                          }
                        >
                          <span>Edit</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-box"
                          onClick={this.delPatientModal}
                          disabled={
                            selectedRows && selectedRows.length ? false : true
                          }
                        >
                          <span>Delete</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-box"
                          type="button"
                          onClick={e => this.queuePatient(e)}
                          disabled={
                            selectedRows && selectedRows.length === 1
                              ? false
                              : true
                          }
                        >
                          <span
                            className={classNames({
                              bold: selectedRows && selectedRows.length === 1
                            })}
                          >
                            Queue
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn-box"
                          onClick={this.handleSearchBar}
                        >
                          <i className="fa fa-search" />
                          <span>Search</span>
                        </button>
                      </li>
                      <li>
                        <button className="btn-box" onClick={this.handleImport}>
                          <i className="fa fa-file" />
                          <span>Import</span>
                        </button>
                      </li>
                    </ul>
                  </Col>
                  <Col sm="2">
                    <ul className="header-right">
                      <li>
                        <ButtonDropdown
                          isOpen={dropdownOpen}
                          toggle={this.toggleDropDown}
                        >
                          <DropdownToggle
                            color="link"
                            size="sm"
                            className="p-0 mr-2"
                          >
                            <i className="icon-settings pr-1" />
                            <span>Actions</span>
                          </DropdownToggle>
                          <DropdownMenu right className="top-dropdown">
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem>Proxied Patients</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardHeader>
              {/* search bar */}
              <div
                className={
                  showSearchBar
                    ? "animated fadeDown box-search "
                    : "animated fadeOut hidden"
                }
              >
                <Row>
                  <Col sm="12">
                    <div className="-body">
                      <FormGroup row>
                        <Col sm="2" className="m-r-15">
                          <Label className="-body-label">Search for:</Label>
                        </Col>
                        <Col sm="3" className="m-l-15 m-r-15">
                          <Input className="form-control-xs pl-2" />
                        </Col>
                        <Col sm="4">
                          <Button
                            size="sm"
                            className="btn-default btn-square mr-2"
                          >
                            Search
                          </Button>
                          <Button size="sm" className="btn-default btn-square">
                            Clear
                          </Button>
                        </Col>
                      </FormGroup>
                      <div></div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <ReactTable
                  data={patients}
                  columns={patientCol}
                  loading={loadPatients}
                  className="-highlight -striped text-left"
                  getTrProps={(state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        onClick: e => {
                          let selectedRows = [];

                          if (e.ctrlKey && this.previousRow) {
                            if (this.previousRow.index < rowInfo.index) {
                              for (
                                let i = this.previousRow.index;
                                i <= rowInfo.index;
                                i++
                              ) {
                                selectedRows.push(
                                  state.sortedData[i]._original
                                );
                              }
                            } else {
                              for (
                                let i = rowInfo.index;
                                i <= this.previousRow.index;
                                i++
                              ) {
                                selectedRows.push(
                                  state.sortedData[i]._original
                                );
                              }
                            }
                          } else {
                            rowInfo._index = rowInfo.index;
                            selectedRows.push(rowInfo.original);
                            this.previousRow = rowInfo;
                          }

                          this.setState({
                            selectedTd: rowInfo.index,
                            selectedRows
                          });
                        },

                        onDoubleClick: e => {
                          e.preventDefault();
                          this.props.history.push("/records/patientChart");
                        },

                        style: {
                          background:
                            this.state.selectedRows.some(
                              e => e.id === rowInfo.original.id
                            ) && "#42a5f533"
                        }
                      };
                    } else {
                      return {};
                    }
                  }}
                />
              </div>
            </Card>

            {/* Add Patient Modal */}
            <Modal
              isOpen={patientMod}
              toggle={this.togglePatientModal}
              backdrop="static"
              className={"modal-lg " + this.props.className}
            >
              <ModalHeader>
                <span className="modal-title f-s-14">
                  <i className="icon-user pr-1" />
                  Patient Editor
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.togglePatientModal}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody className="md-body">
                <Row>
                  <Col sm="12">
                    <Form>
                      <Nav tabs className="nav_tab">
                        <NavItem>
                          <NavLink
                            active={activeNav[0] === "1"}
                            onClick={() => {
                              this.toggleNav(0, "1");
                            }}
                            className="bold"
                          >
                            Patient
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={activeNav[0] === "2"}
                            onClick={() => {
                              this.toggleNav(0, "2");
                            }}
                            className="bold"
                          >
                            Notes
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={activeNav[0] === "3"}
                            onClick={() => {
                              this.toggleNav(0, "3");
                            }}
                            className="bold"
                          >
                            Schemes
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={activeNav[0] === "4"}
                            onClick={() => {
                              this.toggleNav(0, "4");
                            }}
                            className="bold"
                          >
                            BarCode
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeNav[0]}>
                        <TabPane tabId="1">
                          <div className="row-tapane animated fadeIn">
                            <PatientDetails
                              patientData={patientData}
                              handleChange={this.handleChange}
                              handleChangeDate={this.handleChangeDate}
                              handleEnableWebcam={this.handleEnableWebcam}
                              captureImage={this.captureImage}
                              websetRef={this.websetRef}
                              browseRefImg={this.browseRefImg}
                              handleCameraView={this.handleCameraView}
                              saveCapture={this.saveCapture}
                              startWebcamToggle={this.startWebcamToggle}
                              handleUploadImage={this.handleUploadImage}
                              handleFileChange={this.handleFileChange}
                              eraseImage={this.eraseImage}
                              webcamData={webcamData}
                            />
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <div className="animated fadeIn">
                            <FormGroup className="my-3">
                              <Label>Notes:</Label>
                              <Input
                                style={{ minHeight: "440px" }}
                                type="textarea"
                                className="form-control-xs"
                              />
                            </FormGroup>
                          </div>
                        </TabPane>
                        <TabPane tabId="3">
                          <div className="row-tapane animated fadeIn">
                            <Row>
                              <Col sm="12">
                                <Row className="my-3">
                                  <Col md="6">
                                    <Button
                                      color="secondary"
                                      size="sm"
                                      className="btn-square btn-top mr-2"
                                      onClick={this.schemeModal}
                                    >
                                      <i className="fa fa-plus" /> Add Customer
                                      Scheme
                                    </Button>
                                  </Col>
                                </Row>
                                <div className="mb-3">
                                  <ReactTable
                                    data={chemeData}
                                    columns={schemeCol}
                                    defaultPageSize={15}
                                    className="-highlight text-left"
                                    showPagination={false}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                        <TabPane tabId="4">
                          <div className="row-tapane animated fadeIn">
                            <Payer />
                          </div>
                        </TabPane>
                      </TabContent>
                    </Form>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <div className="text-left">
                  {activeNav[0] === "1" ? (
                    <Button
                      color="danger"
                      size="sm"
                      className="btn-square btn-top text-left"
                      type="button"
                    >
                      Smart Card
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <Button
                    color="secondary"
                    size="sm"
                    className="btn-square btn-top mr-2"
                    type="button"
                    onClick={this.togglePatientModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="info"
                    size="sm"
                    className="btn-square btn-top"
                    type="button"
                    disabled={saveProcessing ? true : false}
                    onClick={this.savePatient}
                  >
                    {saveProcessing ? (
                      <span>Proccessing...</span>
                    ) : (
                      <span>
                        <i className="fas fa-save pr-1" />
                        Save &amp; Close
                      </span>
                    )}
                  </Button>
                </div>
              </ModalFooter>
            </Modal>

            {/* Add Customer Scheme */}
            <Modal
              isOpen={schemeMod}
              toggle={this.schemeModal}
              backdrop="static"
              className={this.props.className}
              style={{ top: "10%" }}
            >
              <ModalHeader>
                <span className="modal-title f-s-14">
                  <i className="icon-user pr-1" />
                  Scheme Editor
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.schemeModal}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody className="md-body">
                <Row className="mt-1 p-2">
                  <Col sm="12">
                    <FormGroup row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="surname">Select Scheme:</Label>
                          <Input
                            type="select"
                            id="surname"
                            className="form-control-xs"
                            autoComplete="off"
                          >
                            <option>NHIF Outpatient</option>
                            <option>AAR Insurance</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="surname">Principal Member:</Label>
                          <Input
                            id="surname"
                            className="form-control-xs"
                            autoComplete="off"
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="surname">Membership No.</Label>
                          <Input
                            id="surname"
                            className="form-control-xs"
                            autoComplete="off"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className="check_box">
                          <Input
                            type="checkbox"
                            id="surname"
                            checked={false}
                            className="check_box--input"
                            autoComplete="off"
                          />
                          <label htmlFor="surname" className="check_box--label">
                            <span class="check_box--label-text">
                              Is Principal Member
                            </span>
                          </label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <div>
                  <Button size="sm" className="btn-square mr-2" color="default">
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    className="btn-square"
                    color="info"
                    onClick={this.schemeModal}
                  >
                    Save &amp; Close
                  </Button>
                </div>
              </ModalFooter>
            </Modal>

            {/* Delete Patient Modal */}
            <Modal
              isOpen={delPtMod}
              toggle={this.delPatientModal}
              className={"modal-sm " + this.props.className}
              style={{ top: "30%" }}
            >
              <ModalHeader>
                <span className="modal-title f-s-14">
                  <i className="fa fa-trash pr-1" />
                  Delete Patient
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.delPatientModal}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody>
                <span>
                  Are you sure? This patient will be deleted permanently!
                </span>
              </ModalBody>
              <ModalFooter>
                <div>
                  <Button
                    className="btn-default btn-square mr-2"
                    size="sm"
                    onClick={this.delPatientModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-danger btn-square"
                    size="sm"
                    onClick={this.delPatient}
                  >
                    Delete
                  </Button>
                </div>
              </ModalFooter>
            </Modal>

            {/* Queue Patient Modal */}
            <Modal
              isOpen={queueMod}
              toggle={this.queuePatient}
              backdrop="static"
              className={this.props.className}
            >
              <ModalHeader>
                <span className="modal-title f-s-14">
                  <i className="fa fa-tasks pr-1" />
                  Queue Patient
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.queuePatientClose}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody className="modal-fluid">
                <div className="form-hr">
                  <h6 className="form-title">Patient Details</h6>
                  <hr />
                </div>
                <FormGroup row>
                  <Col sm="6">
                    <Label htmlFor="queue-from">Surname</Label>
                    <Input
                      id="queue-from"
                      className="form-control-xs bold"
                      disabled
                      name="surname"
                      onChange={e => this.handleQueueChange(e)}
                      value={queueData.surname}
                    />
                  </Col>
                  <Col sm="6">
                    <Label htmlFor="queue-to">Other Names</Label>
                    <Input
                      id="queue-to"
                      className="form-control-xs bold"
                      disabled
                      name="otherNames"
                      onChange={e => this.handleQueueChange(e)}
                      value={queueData.otherNames}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="6">
                    <Label htmlFor="queue-from">O.P No.</Label>
                    <Input
                      id="queue-from"
                      className="form-control-xs bold"
                      disabled
                      name="opNo"
                      onChange={e => this.handleQueueChange(e)}
                      value={queueData.opNo}
                    />
                  </Col>
                  <Col sm="6">
                    <Label htmlFor="queue-to">Age</Label>
                    <Input
                      id="queue-to"
                      className="form-control-xs bold"
                      disabled
                      name="age"
                      onChange={e => this.handleQueueChange(e)}
                      value={queueData.age + "yr(s)"}
                    />
                  </Col>
                </FormGroup>
                <div className="form-hr">
                  <h6 className="form-title">Queue Info</h6>
                  <hr />
                </div>
                <FormGroup row>
                  <Col sm="6">
                    <Label htmlFor="queue-from" className="bold">
                      From
                    </Label>
                    <Input
                      id="queue-from"
                      className="form-control-xs"
                      type="select"
                      name="from"
                      value={queueData.from}
                      onChange={e => this.handleQueueChange(e)}
                    >
                      <option value="0" disabled>
                        --Select--
                      </option>
                      {departments && departments.length > 0
                        ? departments.map(dp => (
                            <option key={dp.id} value={dp.depName}>
                              {dp.depName}
                            </option>
                          ))
                        : "No data in table"}
                    </Input>
                  </Col>
                  <Col sm="6">
                    <Label htmlFor="queue-to" className="bold">
                      To
                    </Label>
                    <Input
                      id="queue-to"
                      className="form-control-xs"
                      type="select"
                      name="to"
                      value={queueData.to}
                      onChange={e => this.handleQueueChange(e)}
                    >
                      <option value="0" disabled>
                        --Select--
                      </option>
                      {departments && departments.length > 0
                        ? departments.map(dp => (
                            <option key={dp.id} value={dp.depName}>
                              {dp.depName}
                            </option>
                          ))
                        : "No data in table"}
                    </Input>
                  </Col>
                </FormGroup>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label htmlFor="queue-clinic" className="bold">
                        Clinic
                      </Label>
                      <Input
                        id="queue-clinic"
                        className="form-control-xs"
                        type="select"
                        name="clinic"
                        value={queueData.clinic}
                        onChange={this.handleQueueChange}
                      >
                        <option value="0" disabled>
                          --Select--
                        </option>
                        <option value="General Outpatient">
                          General Outpatient
                        </option>
                        <option value="Dental">Dental</option>
                        <option value="ENT">ENT</option>
                        <option value="MCH">MCH</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Gynacology">Gynacology</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="queue-clinic" className="bold">
                        Visit Default Scheme
                      </Label>
                      <Input
                        id="queue-clinic"
                        className="form-control-xs"
                        type="select"
                        name="scheme"
                        value={queueData.scheme}
                        onChange={this.handleQueueChange}
                      >
                        <option value="0" disabled>
                          --Select--
                        </option>
                        <option value="Cash Payers">Cash Payers</option>
                        <option value="Insurance">Insurance</option>
                      </Input>
                    </FormGroup>

                    <FormGroup check inline>
                      <div className="custom-control custom-checkbox pr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="print-ticket"
                          name="printTicket"
                          checked={queueData.printTicket ? true : false}
                          onChange={this.handleQueueCheck}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="print-ticket"
                        >
                          Print Queue Ticket
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label htmlFor="queue-to" className="bold">
                        Note
                      </Label>
                      <Input
                        id="queue-to"
                        className="form-control-xs"
                        type="textarea"
                        style={{ minHeight: "92px" }}
                        name="note"
                        value={queueData.note}
                        onChange={e => this.handleQueueChange(e)}
                      />
                    </FormGroup>
                    <FormGroup check inline className="mb-2">
                      <div className="custom-control custom-checkbox pr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="queue-emerg"
                          name="isEmergency"
                          checked={queueData.isEmergency ? true : false}
                          onChange={this.handleQueueCheck}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="queue-emerg"
                        >
                          Is Emergency
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <div>
                  <Button
                    className="btn-success btn-square"
                    size="sm"
                    onClick={this.saveQueuePatient}
                  >
                    <i className="fa fa-forward pr-1" /> Queue Patient
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients.data,
  departments: state.departments.data,
  saveProcessing: state.patients.saveProcessing
});

const mapDispatchToProps = {
  fetchPatients,
  createPatient,
  destroyPatient,
  createQueue
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
