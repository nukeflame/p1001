import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import defaultAvatar from "../../../assets/avatar/defAvatar.gif";
import Webcam from "react-webcam";
import { connect } from "react-redux";

class PatientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNav: new Array(4).fill("1"),
      errors: {
        surname: [],
        othernames: [],
        telephone: [],
        nationality: [],
        phone: [],
        email: [],
        idType: [],
        days: [],
        month: [],
        years: [],
        occupation: [],
        idNo: [],
        refNo: [],
        residence: [],
        town: [],
        postalAddress: [],
        emergRelation: [],
        emergName: [],
        emergContacts: [],
        postalCode: [],
        streetRoad: [],
        loc: []
      }
    };
  }

  render() {
    const { activeNav } = this.state;
    const {
      handleChange,
      startWebcamToggle,
      className,
      handleEnableWebcam,
      captureImage,
      websetRef,
      browseRefImg,
      saveCapture,
      handleCameraView,
      handleUploadImage,
      handleFileChange,
      eraseImage,
      patientErrors
    } = this.props;

    const {
      webcamMod,
      errorDevice,
      enableWebcam,
      facingMode,
      imageName,
      sampleImage
    } = this.props.webcamData;

    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: facingMode
    };

    const {
      avatar,
      surname,
      othernames,
      telephone,
      nationality,
      phone,
      email,
      idType,
      days,
      month,
      years,
      occupation,
      idNo,
      refNo,
      residence,
      town,
      postalAddress,
      emergRelation,
      emergName,
      emergContacts,
      postalCode,
      streetRoad,
      loc
    } = this.props.patientData;

    return (
      <div>
        <Row>
          <Col sm="9">
            {/* spacing */}
            <div className="my-3"></div>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="surname" className="bold">
                    Surname:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="surname"
                    className="form-control-xs"
                    name="surname"
                    value={surname}
                    onChange={e => handleChange(e)}
                    invalid={
                      patientErrors.surname && patientErrors.surname.length > 0
                        ? true
                        : false
                    }
                  />
                  <FormFeedback className="animated fadeIn">
                    {patientErrors.surname}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="othernames" className="bold">
                    Other Names:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="othernames"
                    className="form-control-xs"
                    name="othernames"
                    value={othernames}
                    onChange={e => handleChange(e)}
                    invalid={
                      patientErrors.othernames &&
                      patientErrors.othernames.length > 0
                        ? true
                        : false
                    }
                  />
                  <FormFeedback className="animated fadeIn">
                    {patientErrors.othernames}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="phone" className="bold">
                    Phone:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="phone"
                    className="form-control-xs"
                    name="phone"
                    value={phone}
                    onChange={e => handleChange(e)}
                    invalid={
                      patientErrors.phone && patientErrors.phone.length > 0
                        ? true
                        : false
                    }
                  />
                  <FormFeedback className="animated fadeIn">
                    {patientErrors.phone}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="sex" className="bold">
                    Sex:
                  </Label>
                  <small className="req"> *</small>
                  <div>
                    <FormGroup check inline className="pt-1">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="male"
                        name="sex"
                        value="Male"
                        onChange={e => handleChange(e)}
                        invalid={
                          patientErrors.sex && patientErrors.sex.length > 0
                            ? true
                            : false
                        }
                      />
                      <Label className="form-check-label" check htmlFor="male">
                        Male
                      </Label>
                    </FormGroup>
                    <FormGroup check inline className="pt-1">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="female"
                        name="sex"
                        value="Female"
                        onChange={e => handleChange(e)}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="female"
                      >
                        Female
                      </Label>
                    </FormGroup>
                  </div>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    type="email"
                    id="email"
                    className="form-control-xs"
                    name="email"
                    value={email}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    className="form-control-xs"
                    name="telephone"
                    value={telephone}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="dob" className="bold">
                    Date of Birth:
                  </Label>
                  <small className="req"> *</small>
                  <div className="d-flex-align">
                    <Input
                      type="select"
                      className="form-control-xs m-r-5"
                      style={{ width: "48px" }}
                      name="days"
                      id="day"
                      title="Day"
                      value={days}
                      onChange={e => handleChange(e)}
                      invalid={
                        patientErrors.days && patientErrors.days.length > 0
                          ? true
                          : false
                      }
                    >
                      <option value="0" disabled>
                        Day
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </Input>
                    <Input
                      type="select"
                      className="form-control-xs m-r-5"
                      name="month"
                      id="month"
                      title="Month"
                      style={{ width: "62px" }}
                      value={month}
                      onChange={e => handleChange(e)}
                      invalid={
                        patientErrors.month && patientErrors.month.length > 0
                          ? true
                          : false
                      }
                    >
                      <option value="0" disabled>
                        Month
                      </option>
                      <option value="1">Jan</option>
                      <option value="2">Feb</option>
                      <option value="3">Mar</option>
                      <option value="4">Apr</option>
                      <option value="5">May</option>
                      <option value="6">Jun</option>
                      <option value="7">Jul</option>
                      <option value="8">Aug</option>
                      <option value="9">Sept</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </Input>
                    <Input
                      type="select"
                      className="form-control-xs"
                      name="years"
                      id="year"
                      title="Year"
                      style={{ width: "55px" }}
                      value={years}
                      onChange={e => handleChange(e)}
                      invalid={
                        patientErrors.years && patientErrors.years.length > 0
                          ? true
                          : false
                      }
                    >
                      <option value="0" disabled>
                        Year
                      </option>
                      <option value="2019">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option>
                      <option value="2009">2009</option>
                      <option value="2008">2008</option>
                      <option value="2007">2007</option>
                      <option value="2006">2006</option>
                      <option value="2005">2005</option>
                      <option value="2004">2004</option>
                      <option value="2003">2003</option>
                      <option value="2002">2002</option>
                      <option value="2001">2001</option>
                      <option value="2000">2000</option>
                      <option value="1999">1999</option>
                      <option value="1998">1998</option>
                      <option value="1997">1997</option>
                      <option value="1996">1996</option>
                      <option value="1995">1995</option>
                      <option value="1994">1994</option>
                      <option value="1993">1993</option>
                      <option value="1992">1992</option>
                      <option value="1991">1991</option>
                      <option value="1990">1990</option>
                      <option value="1989">1989</option>
                      <option value="1988">1988</option>
                      <option value="1987">1987</option>
                      <option value="1986">1986</option>
                      <option value="1985">1985</option>
                      <option value="1984">1984</option>
                      <option value="1983">1983</option>
                      <option value="1982">1982</option>
                      <option value="1981">1981</option>
                      <option value="1980">1980</option>
                      <option value="1979">1979</option>
                      <option value="1978">1978</option>
                      <option value="1977">1977</option>
                      <option value="1976">1976</option>
                      <option value="1975">1975</option>
                      <option value="1974">1974</option>
                      <option value="1973">1973</option>
                      <option value="1972">1972</option>
                      <option value="1971">1971</option>
                      <option value="1970">1970</option>
                      <option value="1969">1969</option>
                      <option value="1968">1968</option>
                      <option value="1967">1967</option>
                      <option value="1966">1966</option>
                      <option value="1965">1965</option>
                      <option value="1964">1964</option>
                      <option value="1963">1963</option>
                      <option value="1962">1962</option>
                      <option value="1961">1961</option>
                      <option value="1960">1960</option>
                      <option value="1959">1959</option>
                      <option value="1958">1958</option>
                      <option value="1957">1957</option>
                      <option value="1956">1956</option>
                      <option value="1955">1955</option>
                      <option value="1954">1954</option>
                      <option value="1953">1953</option>
                      <option value="1952">1952</option>
                      <option value="1951">1951</option>
                      <option value="1950">1950</option>
                      <option value="1949">1949</option>
                      <option value="1948">1948</option>
                      <option value="1947">1947</option>
                      <option value="1946">1946</option>
                      <option value="1945">1945</option>
                      <option value="1944">1944</option>
                      <option value="1943">1943</option>
                      <option value="1942">1942</option>
                      <option value="1941">1941</option>
                      <option value="1940">1940</option>
                      <option value="1939">1939</option>
                      <option value="1938">1938</option>
                      <option value="1937">1937</option>
                      <option value="1936">1936</option>
                      <option value="1935">1935</option>
                      <option value="1934">1934</option>
                      <option value="1933">1933</option>
                      <option value="1932">1932</option>
                      <option value="1931">1931</option>
                      <option value="1930">1930</option>
                      <option value="1929">1929</option>
                      <option value="1928">1928</option>
                      <option value="1927">1927</option>
                      <option value="1926">1926</option>
                      <option value="1925">1925</option>
                      <option value="1924">1924</option>
                      <option value="1923">1923</option>
                      <option value="1922">1922</option>
                      <option value="1921">1921</option>
                      <option value="1920">1920</option>
                      <option value="1919">1919</option>
                      <option value="1918">1918</option>
                      <option value="1917">1917</option>
                      <option value="1916">1916</option>
                      <option value="1915">1915</option>
                      <option value="1914">1914</option>
                      <option value="1913">1913</option>
                      <option value="1912">1912</option>
                      <option value="1911">1911</option>
                      <option value="1910">1910</option>
                      <option value="1909">1909</option>
                      <option value="1908">1908</option>
                      <option value="1907">1907</option>
                      <option value="1906">1906</option>
                      <option value="1905">1905</option>
                    </Input>
                  </div>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="occupation" className="bold">
                    Occupation:
                  </Label>
                  <small className="req"> *</small>
                  <div className="d-flex-align">
                    <Input
                      id="occupation"
                      className="form-control-xs"
                      type="select"
                      name="occupation"
                      value={occupation}
                      onChange={e => handleChange(e)}
                      invalid={
                        patientErrors.occupation &&
                        patientErrors.occupation.length > 0
                          ? true
                          : false
                      }
                    >
                      <option value="0">None</option>
                      <option value="1">Labourer</option>
                      <option value="2">Technician</option>
                      <option value="3">Lecturer</option>
                    </Input>
                    <Button color="link" size="sm">
                      <i className="fas fa-plus"></i>
                    </Button>
                  </div>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="nationality" className="bold">
                    Nationality:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="nationality"
                    className="form-control-xs"
                    type="select"
                    name="nationality"
                    value={nationality}
                    onChange={e => handleChange(e)}
                    invalid={
                      patientErrors.nationality &&
                      patientErrors.nationality.length > 0
                        ? true
                        : false
                    }
                  >
                    <option value="0">None</option>
                    <option value="1">Kenyan</option>
                    <option value="2">Ugandan</option>
                    <option value="3">Tanzanian</option>
                  </Input>
                  <FormFeedback className="animated fadeIn">
                    {patientErrors.nationality}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="idType" className="bold">
                    ID Type:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    type="select"
                    id="idType"
                    className="form-control-xs"
                    name="idType"
                    value={idType}
                    onChange={e => handleChange(e)}
                  >
                    <option value="None">None</option>
                    <option value="National Identity Card">
                      National Identity Card
                    </option>
                    <option value="Alien's Card">Alien's Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Military ID">Military ID</option>
                    <option value="Birth Certificate ID">
                      Birth Certificate ID
                    </option>
                    <option value="Driving License">Driving License</option>
                    <option value="Student ID">Student ID</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="idNo">ID No:</Label>
                  <Input
                    id="idNo"
                    className="form-control-xs"
                    name="idNo"
                    value={idNo}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="refNo">Reference No:</Label>
                  <Input
                    id="refNo"
                    className="form-control-xs"
                    name="refNo"
                    value={refNo}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            <div className="form-hr">
              <h6 className="form-title">Physical Address</h6>
              <hr />
            </div>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="residence" className="bold">
                    Residence:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="residence"
                    className="form-control-xs"
                    name="residence"
                    value={residence}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="town" className="bold">
                    Town:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    type="select"
                    id="town"
                    className="form-control-xs"
                    name="town"
                    value={town}
                    onChange={e => handleChange(e)}
                  >
                    <option value="0">None</option>
                    <option value="1">Nairobi</option>
                    <option value="2">Kitui</option>
                    <option value="3">Molo</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="postalCode">Postal Code:</Label>
                  <Input
                    id="postalCode"
                    className="form-control-xs"
                    name="postalCode"
                    value={postalCode}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="postalAddress">Postal Address:</Label>
                  <Input
                    id="postalAddress"
                    className="form-control-xs"
                    name="postalAddress"
                    value={postalAddress}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="streetRoad">Street/Road:</Label>
                  <Input
                    id="streetRoad"
                    className="form-control-xs"
                    name="streetRoad"
                    value={streetRoad}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="loc">Location:</Label>
                  <Input
                    id="loc"
                    className="form-control-xs"
                    name="loc"
                    value={loc}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            <div className="form-hr">
              <h6 className="form-title">Emergency Contacts</h6>
              <hr className="hrf-line" />
            </div>
            <FormGroup row>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="emergRelation" className="bold">
                    Relationship:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="emergRelation"
                    className="form-control-xs"
                    name="emergRelation"
                    value={emergRelation}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="emergName" className="bold">
                    Name:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="emergName"
                    className="form-control-xs"
                    name="emergName"
                    value={emergName}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label htmlFor="emergContacts" className="bold">
                    Contacts:
                  </Label>
                  <small className="req"> *</small>
                  <Input
                    id="emergContacts"
                    className="form-control-xs"
                    name="emergContacts"
                    value={emergContacts}
                    onChange={e => handleChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
          </Col>
          <Col sm="3">
            <div className="pb-1">
              <Nav tabs className="nav_tab">
                <NavItem className="nav_sider">
                  <NavLink
                    active={activeNav[0] === "1"}
                    disabled
                    className="bold"
                  >
                    Webcam
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeNav[0]} className="nav_tab-content">
                <TabPane tabId="1">
                  {/* spacing */}
                  <div className="my-3"></div>

                  <div className="text-center">
                    <div className="p-avatar">
                      {avatar === null ? (
                        <img src={defaultAvatar} alt="" />
                      ) : (
                        <img src={avatar} alt="" />
                      )}
                    </div>
                    <div className="pb-2">
                      <Row>
                        <Col sm="6">
                          <Button
                            color="secondary"
                            block
                            size="sm"
                            className="btn-square"
                            onClick={e => startWebcamToggle(e)}
                          >
                            Webcam
                          </Button>
                        </Col>
                        <Col sm="6">
                          <Button
                            color="secondary"
                            block
                            size="sm"
                            className="btn-square"
                            onClick={e => handleUploadImage(e)}
                          >
                            Browse
                          </Button>
                          <input
                            type="file"
                            ref={input => browseRefImg(input)}
                            className="hidden"
                            onChange={e => handleFileChange(e)}
                            accept="image/*"
                          />
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col sm="12">
                          <Button
                            color="secondary"
                            block
                            size="sm"
                            className="btn-square"
                            onClick={e => eraseImage(e)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            {/* Webcam Modal */}
            <Modal
              isOpen={webcamMod}
              toggle={e => startWebcamToggle(e)}
              backdrop="static"
              className={className}
              style={{ top: "15%" }}
            >
              <ModalHeader>
                <span className="modal-title text-center f-s-14 f-w-600">
                  <i className="icon-camera f-w-600 pr-1" />
                  Capture Image
                </span>
                <span>
                  <Button
                    color="link"
                    className="modal-close-x"
                    type="button"
                    onClick={e => startWebcamToggle(e)}
                  >
                    <i className="fa fa-times text-white" />
                  </Button>
                </span>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm="8">
                    <div className="cameraview">
                      {errorDevice ? (
                        <div className="p-relative">
                          <div className="p-center">
                            <p>Camera device not found!</p>
                          </div>
                        </div>
                      ) : enableWebcam ? (
                        <Webcam
                          audio={false}
                          height={300}
                          ref={webcam => websetRef(webcam)}
                          screenshotFormat="image/jpeg"
                          width={300}
                          videoConstraints={videoConstraints}
                          // onUserMediaError={this.onUserMediaError}
                        />
                      ) : (
                        <div className="p-relative">
                          <div className="p-center">
                            <p>Enable Camera</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm="4">
                    <div style={{ position: "relative" }}>
                      <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        block
                        className="btn-square m-t-5"
                        onClick={e => handleEnableWebcam(e)}
                      >
                        {enableWebcam ? "Disable Camera" : "Enable Camera"}
                      </Button>
                      <FormGroup className="my-3">
                        <Label>Camera Layout</Label>
                        <Input
                          type="select"
                          className="form-control-xs"
                          onChange={e => handleCameraView(e)}
                        >
                          <option value="environment">Back Camera</option>
                          <option value="user">Front Camera</option>
                        </Input>
                      </FormGroup>
                      <Button
                        type="button"
                        color="info"
                        size="sm"
                        block
                        className="btn-square my-3"
                        disabled={
                          errorDevice || enableWebcam === false ? true : false
                        }
                        onClick={e => captureImage(e)}
                      >
                        Capture
                      </Button>

                      <div>
                        {sampleImage !== "" ? (
                          <img
                            src={sampleImage}
                            alt=""
                            style={{ height: "136px" }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Row>
                  <Col sm="12">
                    <Button
                      type="button"
                      color="primary"
                      size="sm"
                      className="btn-square mr-2"
                      disabled={errorDevice || imageName === "" ? true : false}
                      onClick={e => saveCapture(e)}
                    >
                      Ok
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      size="sm"
                      className="btn-square"
                      onClick={e => startWebcamToggle(e)}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patientErrors: state.patients.patientErrors
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
