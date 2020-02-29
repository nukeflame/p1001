import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  TabContent,
  TabPane,
  FormGroup,
  Input,
  Label,
  CardFooter
} from "reactstrap";
import classNames from "classnames";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class BillingData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topActiveTab: "1"
    };
  }

  toggleTopNav = tab => {
    const { topActiveTab } = this.state;

    if (topActiveTab !== tab) {
      this.setState({
        topActiveTab: tab
      });
    }
  };

  linkToTrans = e => {
    e.preventDefault();
    // $("#patientProfile, .main-search-box").removeClass("hidden");
    // $("#dashSearch").addClass("hidden");
    this.props.history.push("/billing/patient");
  };

  render() {
    const { topActiveTab } = this.state;
    const data = [
      {
        date: "23-07-1998",
        item: "Consultation",
        qty: "300"
      }
    ];
    const columns = [
      {
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Item",
        accessor: "item"
      },
      {
        Header: "Qty",
        accessor: "qty"
      },
      {
        Header: "Bill Qty",
        accessor: "billQty"
      },
      {
        Header: "Deliv. Qty",
        accessor: "delivQty"
      },
      {
        Header: "Stock",
        accessor: "stock"
      },
      {
        Header: "Cost",
        accessor: "cost"
      },
      {
        Header: "Incl. Taxes",
        accessor: "inclTaxes"
      }
    ];

    return (
      <div>
        <Row>
          <Col sm="3">
            <div className="d-flex-col">
              <div className="d-flex-align">
                <h5 className="mb-0">
                  <span className="f-s-12">Ksh</span> 0.00
                </h5>
                <span className="f-s-13 pl-2 text-muted">Balance</span>
              </div>
              <div className="d-flex-align mt-3">
                <h5 className="mb-0">
                  <span className="f-s-12">Ksh</span> 5,000,000,000
                </h5>
                <span className="f-s-13 pl-2 text-muted">Debit</span>
              </div>
              <div className="d-flex-align">
                <h5 className="mb-0">
                  <span className="f-s-12">Ksh</span> 5,000,000,000
                </h5>
                <span className="f-s-13 pl-2 text-muted">Credit</span>
              </div>
            </div>
          </Col>
          <Col sm="3">
            <Button color="link" size="sm" onClick={this.linkToTrans}>
              <i className="icon-plus" /> Add Transaction
            </Button>
            <Button color="link" size="sm">
              <i className="icon-share-alt" /> Summary Report
            </Button>
            <div>
              <Button color="link" size="sm">
                <i className="fa fa-arrow-right" /> More...
              </Button>
            </div>
          </Col>
          <Col sm="3">
            <Button color="link" size="sm">
              Edit Billing Notes
            </Button>
          </Col>
        </Row>
        <div className="mt-4">
          <Row>
            <Col sm="12">
              <div className="navitem-header">
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
                      Billable Items
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
                      Transactions
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classNames({
                        active: topActiveTab === "3"
                      })}
                      onClick={() => {
                        this.toggleTopNav("3");
                      }}
                    >
                      Prepaid
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classNames({
                        active: topActiveTab === "4"
                      })}
                      onClick={() => {
                        this.toggleTopNav("4");
                      }}
                    >
                      Balance Sheet
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
          </Row>
          <div className="body-pills pt-3">
            <TabContent
              activeTab={topActiveTab}
              className="animated fadeIn content-pills"
            >
              <TabPane tabId="1" className="animated fadeIn">
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
                                  Build Invoice
                                </span>
                              </button>
                            </li>
                            <li>
                              <button className="btn-box">
                                <i className="fa fa-plus c-primary pr-1" />
                                <span className="mini-title">
                                  Build Receipt
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </CardHeader>
                      <div className="m-2">
                        <Row>
                          <Col sm="8">
                            <Row className="mb-10">
                              <Col sm="3">
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
                              </Col>
                              <Col sm="4">
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
                            <Row className="mb-10">
                              <Col sm="3">
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
                              </Col>
                              <Col sm="4">
                                <FormGroup>
                                  <select
                                    id="bilon"
                                    className="form-control form-control-xs f-s-10"
                                  >
                                    <option>14-Feb-2019</option>
                                  </select>
                                </FormGroup>
                              </Col>
                              <Col sm="4">
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
                                    Dispense at Pharmacy
                                  </Label>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="mb-10">
                              <Col sm="3">
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
                              </Col>
                              <Col sm="4">
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
                            <Row className="mb-10">
                              <Col sm="3">
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
                                    Invoice Imaging on:
                                  </Label>
                                </FormGroup>
                              </Col>
                              <Col sm="4">
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
                            <Row>
                              <Col sm="3">
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
                                    Bill Items Grouped
                                  </Label>
                                </FormGroup>
                              </Col>
                              <Col sm="6">
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
                                    Auto change prices on Location change
                                  </Label>
                                </FormGroup>
                              </Col>
                              <Col sm="3">
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
                                    Bill Materials
                                  </Label>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col sm="12">
                            <ReactTable
                              className="-highlight text-left"
                              data={data}
                              columns={columns}
                              // getTrProps={(state, rowInfo) =>
                              //   this.handleRowClick(state, rowInfo)
                              // }
                            />
                          </Col>
                        </Row>
                      </div>
                      <CardFooter className="p-5 bg-warn">
                        <span>
                          Check the lines you want to bill. The Quantity and
                          Cost fields are editable
                        </span>
                        <span className="float-right">
                          <a href="/" color="link">
                            Hide
                          </a>
                        </span>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2" className="animated fadeIn">
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
                            <ul className="timeline">d</ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3" className="animated fadeIn">
                2
              </TabPane>
              <TabPane tabId="4" className="animated fadeIn">
                3{" "}
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BillingData);
