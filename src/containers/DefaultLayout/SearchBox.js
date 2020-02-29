import React, { Component } from "react";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  FormGroup,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";

import ReactTable from "react-table";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: [],
      selected: null,
      selectedRows: []
    };
  }

  // updateSearch = e => {
  //   const { search } = this.state;
  //   const { patients } = this.props;

  //   this.setState(
  //     {
  //       search: e.target.value.substr(0, 60)
  //     },
  //     () => {
  //       if (search && search.length > 0) {
  //         this.setState({
  //           results: patients
  //         });
  //       } else {
  //         this.setState({
  //           results: []
  //         });
  //       }
  //     }
  //   );
  // };

  // handleRowClick = (state, rowInfo) => {
  //   if (rowInfo && rowInfo.row) {
  //     return {
  //       onClick: e => {
  //         // let selectedRows = [];
  //         console.log(rowInfo);
  //       }
  //     };
  //   }

  //   // $("#dashSearch, .main-search-box").addClass("hidden");
  //   // $("#patientProfile").removeClass("hidden");
  //   // this.props.toggleSearch();
  // };

  handleClickPatient = id => {
    // color: #23282c;
    // background-color: rgba(0, 0, 0, 0.075);
    console.log(id);
  };

  render() {
    const { searchMod, toggleSearch } = this.props;

    const patientData = [
      {
        firstname: "Kennedy Mwanzi Peters",
        age: "54y",
        idNo: "35281226",
        address: "4726 - 11th Ave, N.E., Seattle, WA, 98105",
        patientNo: "000001",
        medic: "Andrew Ameladss",
        entryDate: "14-Feb-2019"
      },
      {
        firstname: "Melving Owuor",
        age: "32",
        idNo: "32516262",
        address: "468 - 11th Ave, N.E., Uass, WA, 98105",
        patientNo: "000002",
        medic: "Andrew  Fuller",
        entryDate: "15-Feb-2019"
      }
    ];
    const patientCol = [
      {
        Header: "Patient",
        accessor: "firstname",
        headerClassName: "text-left",
        className: "text-left bold f-s-14",
        minWidth: 150
      },
      {
        Header: "Age",
        accessor: "age",
        headerClassName: "text-left",
        className: "text-left",
        minWidth: 50
      },
      {
        Header: "ID No.",
        accessor: "idNo",
        headerClassName: "text-left",
        className: "text-left",
        minWidth: 70
      },
      {
        Header: "Address",
        accessor: "address",
        headerClassName: "text-left",
        className: "text-left",
        minWidth: 150
      },
      {
        Header: "Patient No.",
        accessor: "patientNo",
        headerClassName: "text-left",
        className: "text-left",
        minWidth: 70
      },
      {
        Header: "Entry Date",
        accessor: "entryDate",
        headerClassName: "text-left",
        className: "text-left",
        minWidth: 60
      },
      {
        Header: "Medic",
        accessor: "medic",
        headerClassName: "text-left",
        className: "text-left"
      }
    ];

    // let filteredList = results.filter(result => {
    //   let search = this.state.search.toLowerCase();

    //   return result.patient.firstname.toLowerCase().indexOf(search) !== -1;
    // });

    return (
      <Modal
        isOpen={searchMod}
        toggle={toggleSearch}
        backdrop="static"
        className={"modal-xl " + this.props.className}
      >
        <ModalHeader>
          <span className="modal-title f-s-14">
            <i className="fa fa-search" /> Search Patient
          </span>
          <span>
            <Button
              color="link"
              className="modal-close-x"
              type="button"
              onClick={e => toggleSearch(e)}
            >
              <i className="fa fa-times text-white" />
            </Button>
          </span>
        </ModalHeader>
        <ModalBody className="bg1">
          <Row>
            <Col sm="6">
              <FormGroup>
                <Input
                  className="form-control-sm f-s-13 pl-2"
                  placeholder="Type your search here"
                  // onChange={e => this.updateSearch(e)}
                  autoComplete="off"
                  autoFocus={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="mt-3">
            <Row>
              <Col sm="12">
                <Card className="box">
                  <ReactTable
                    className="-striped"
                    data={patientData}
                    columns={patientCol}
                    showPagination={false}
                    showPaginationBottom={false}
                    showPageSizeOptions={false}
                    getTrProps={(state, rowInfo) => {
                      return {
                        // onClick: e => {
                        //   this.handleRowClick(state, rowInfo);
                        // },

                        onDoubleClick: e => {
                          e.preventDefault();
                          // this.props.setPatient(rowInfo.original).then(() => {
                          //   toggleSearch();
                          // });
                        }
                      };
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col sm="12">
              <div>
                <Button color="info" className="btn-square mr-1 w-95p">
                  Ok
                </Button>
                <Button
                  color="secondary"
                  className="btn-square w-95p"
                  onClick={e => toggleSearch(e)}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  // patients: state.patients.data
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
