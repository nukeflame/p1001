import React, { Component } from "react";
import {
  Card,
  CardHeader,
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
  FormGroup,
  Label,
  Input,
  CardBody
} from "reactstrap";
import classNames from "classnames";
import ReactTable from "react-table";

export class Consultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      activeModTab: 0,
      addConsultationMod: false
    };
  }

  toggleDropDown = () => {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  toggleConsModal = () => {
    const { addConsultationMod } = this.state;
    this.setState({
      addConsultationMod: !addConsultationMod
    });
  };

  toggleMiniBox = tab => {
    const { activeModTab } = this.state;
    if (activeModTab !== tab) {
      this.setState({
        activeModTab: tab
      });
    }
  };

  handleSelectedVisit = (e, props) => {
    e.preventDefault();
    console.log(props);
  };

  render() {
    const { selectedRows, activeModTab, addConsultationMod } = this.state;
    const { cp } = this.props;
    const constStyle = {
      minHeight: "calc(100vh - 166px)",
      padding: "0px"
    };

    const visits = [
      {
        visitId: "000069",
        dateOfVisit: "May 17, 2019 9:58 am",
        note: "Hepatic hydratid cypt nupture",
        summaryReport: "View Summary",
        medic: "Andrew A. Fuller"
      },
      {
        visitId: "000069",
        dateOfVisit: "May 17, 2019 9:58 am",
        note: "Hepatic hydratid cypt nupture",
        summaryReport: "View Summary",
        medic: "Andrew A. Fuller"
      },
      {
        visitId: "000069",
        dateOfVisit: "May 17, 2019 9:58 am",
        note: "Hepatic hydratid cypt nupture",
        summaryReport: "View Summary",
        medic: "Andrew A. Fuller"
      },
      {
        visitId: "000069",
        dateOfVisit: "May 17, 2019 9:58 am",
        note: "Hepatic hydratid cypt nupture",
        medic: "Andrew A. Fuller"
      }
    ];
    const columns = [
      {
        Header: "Visit Id",
        accessor: "visitId",
        minWidth: 40
      },
      {
        Header: "Date of Visit",
        accessor: "dateOfVisit"
      },
      {
        Header: "Note",
        accessor: "note"
      },
      {
        Header: "Medic",
        accessor: "medic",
        minWidth: 70
      },
      {
        Header: "Summary Report",
        accessor: "summaryReport",
        minWidth: 70,
        Cell: props => (
          <Button
            color="link"
            size="sm"
            className="p-0"
            onClick={e => this.handleSelectedVisit(e, props.original)}
          >
            <span className="">View Summary</span>
          </Button>
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col sm="12">
            <Card className="box" style={{ marginBottom: "10px" }}>
              <CardHeader className="box-header">
                <Row>
                  <Col sm="6">
                    <ul className="header-left">
                      <li>
                        <button
                          className="btn-box"
                          type="button"
                          onClick={this.toggleConsModal}
                        >
                          <i className="fa fa-plus c-primary" />
                          <span className="mini-title">Add Consultation</span>
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
                            In Queue
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
                    </ul>
                  </Col>
                  <Col sm="6">
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
                          <option>Today</option>
                          <option>Yesterday</option>
                          <option>Last 7 Days</option>
                          <option>Last Week</option>
                          <option>This Month</option>
                          <option>Last Month</option>
                          <option>Last 30 Days</option>
                          <option>Last 60 Days</option>
                          <option>Last 90 Days</option>
                          <option>Last 120 Days</option>
                          <option>All Time</option>
                        </select>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={constStyle}>
                <Row>
                  <Col sm="8">
                    <ReactTable
                      data={visits}
                      columns={columns}
                      // loading={loadPatients}
                      className="-highlight -striped text-left"
                      pageSizeOptions={[16, 30, 40, 50]}
                      defaultPageSize={16}
                      // getTrProps={(state, rowInfo) => {
                      //   if (rowInfo && rowInfo.row) {
                      //     return {
                      //       onClick: e => {
                      //         let selectedRows = [];

                      //         if (e.ctrlKey && this.previousRow) {
                      //           if (this.previousRow.index < rowInfo.index) {
                      //             for (
                      //               let i = this.previousRow.index;
                      //               i <= rowInfo.index;
                      //               i++
                      //             ) {
                      //               selectedRows.push(
                      //                 state.sortedData[i]._original
                      //               );
                      //             }
                      //           } else {
                      //             for (
                      //               let i = rowInfo.index;
                      //               i <= this.previousRow.index;
                      //               i++
                      //             ) {
                      //               selectedRows.push(
                      //                 state.sortedData[i]._original
                      //               );
                      //             }
                      //           }
                      //         } else {
                      //           rowInfo._index = rowInfo.index;
                      //           selectedRows.push(rowInfo.original);
                      //           this.previousRow = rowInfo;
                      //         }

                      //         this.setState({
                      //           selectedTd: rowInfo.index,
                      //           selectedRows
                      //         });
                      //       },

                      //       onDoubleClick: e => {
                      //         e.preventDefault();
                      //         this.props.history.push("/records/patientChart");
                      //       },

                      //       style: {
                      //         background:
                      //           this.state.selectedRows.some(
                      //             e => e.id === rowInfo.original.id
                      //           ) && "#42a5f533"
                      //       }
                      //     };
                      //   } else {
                      //     return {};
                      //   }
                      // }}
                    />
                  </Col>
                  <Col sm="4">
                    <div
                      style={{
                        marginTop: "5px",
                        marginLeft: "-30px",
                        padding: "10px",
                        height: "calc(100vh - 166px)",
                        overflowY: "scroll"
                      }}
                    >
                      <h6 className="bold">Hepatic hydratid cysyt rupture</h6>
                      <div>
                        <i className="text-muted">Details</i>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Facilis sed praesentium, doloribus nisi
                          voluptatibus omnis dignissimos impedit, mollitia
                          molestias delectus incidunt quibusdam ipsam ut quo
                          deserunt quidem voluptate fuga modi?
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* Add Consultation Modal */}
            <Modal
              isOpen={addConsultationMod}
              toggle={this.toggleConsModal}
              className={this.props.className}
              backdrop="static"
              fade={false}
              autoFocus={true}
              size="xl"
              modalClassName="modal_stretch animated fadeIn"
            >
              <ModalHeader className="m-0">
                <span className="modal-title f-s-14">
                  <i className="icon-user pr-1" />
                  Consultation - {cp.fullname}
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={this.toggleConsModal}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody className="p-0">
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
                            <span className="mini-title">Save &amp; Close</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn-box"
                            onClick={this.toggleConsModal}
                          >
                            <span>Cancel</span>
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
                    <Col sm="4" xl="3" className="sidel-bg">
                      <div>
                        <div className="form-group">
                          <label htmlFor="allergyDate" className="bold mb-0">
                            Date
                          </label>
                          <select
                            id="allergyDate"
                            className="form-control form-control-xs p-t-5"
                          >
                            <option>14-Feb-2019</option>
                          </select>
                        </div>
                        <div className="form-group  ">
                          <label htmlFor="medic" className="bold mb-0">
                            Medic
                          </label>
                          <select
                            id="medic"
                            className="form-control form-control-xs p-t-5"
                          >
                            <option>--none--</option>
                          </select>
                        </div>
                        <div className="form-group  ">
                          <label htmlFor="location" className="bold mb-0">
                            Location
                          </label>
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
                    <Col sm="8" xl="9" className="sider-bg">
                      <TabContent className="tab-box" activeTab={activeModTab}>
                        <TabPane tabId={0} className="animated fadeIn">
                          <Row>
                            <Col sm="2">
                              <Label htmlFor="tile" className="pt-1">
                                Title
                              </Label>
                            </Col>
                            <Col sm="8">
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
                            <Col sm="8">
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
                                Medication
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
                              <Label htmlFor="recomendations" className="pt-1">
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
                                  <Label htmlFor="details" className="p-t-5">
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
                              <h6 className="f-s-13 f-w-600">Cardiovascular</h6>
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
                            <h6 className="f-s-13 f-w-600">Physical Exam</h6>
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
                            <h6 className="f-s-11 f-w-400">Billable Items</h6>
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
      </div>
    );
  }
}

export default Consultation;
