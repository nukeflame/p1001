import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  TabContent,
  TabPane,
  FormGroup
} from "reactstrap";
import { connect } from "react-redux";
import {
  fetchPermGroups,
  updatePermGroup
} from "../../../redux/actions/permActions";
// import { isNull, isEmpty } from "lodash";

class Permissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGroup: 0,
      roleGroupId: 0,
      permCatIds: [],
      catData: []
    };
  }

  toggleGroups = (group, tab) => {
    const { activeGroup } = this.state;
    const hospBranchId = 1;

    if (activeGroup !== tab) {
      this.setState({ activeGroup: tab, roleGroupId: group.id });
    }

    const perm = group.permissions;
    // const { catData } = this.state;
    const branchPerms = [];
    const nameSlug = [];

    // hospital branch
    for (let i = 0; i < perm.length; i++) {
      const p = perm[i];
      if (hospBranchId === p.pivot.hosp_branch_id) {
        branchPerms.push(p);
      }
    }

    for (let i = 0; i < branchPerms.length; i++) {
      const b = branchPerms[i];
      if (b.pivot.can_view) {
        nameSlug.push(`${b.slug}-view`);
      }
      if (b.pivot.can_edit) {
        nameSlug.push(`${b.slug}-edit`);
      }
      if (b.pivot.can_create) {
        nameSlug.push(`${b.slug}-create`);
      }
      if (b.pivot.can_delete) {
        nameSlug.push(`${b.slug}-delete`);
      }
    }

    console.log(nameSlug);

    // if (pv.can_view) {
    //   // console.log(p);

    //   viewSlug.push(`${p.slug}-view`);
    // }
    // if (pv.can_edit) {
    //   viewSlug.push(`${p.slug}-edit`);
    // }
    // if (pv.can_create) {
    //   viewSlug.push(`${p.slug}-create`);
    // }
    // if (pv.can_delete) {
    //   viewSlug.push(`${p.slug}-delete`);
    // }

    this.setState({
      catData: nameSlug
    });
  };

  // toggleGroups = (group, tab) => {
  //   const { activeGroup } = this.state;

  //   if (activeGroup !== tab) {
  //     this.setState({ activeGroup: tab, roleGroupId: group.id });
  //   }

  //   const perm = group.permissions;
  //   let arrV = [],
  //     permCatIds = [],
  //     arrA = [],
  //     arrE = [],
  //     arrD = [];

  //   if (perm.length > 0) {
  //     for (let i = 0; i < perm.length; i++) {
  //       const pv = perm[i].pivot;

  //       permCatIds.push(pv.perm_category_id);
  //       arrV.push(pv.can_view);
  //       arrA.push(pv.can_add);
  //       // arrD.push(pv.can_delete);
  //       // console.log(pv);

  //       this.setState(prevState => ({
  //         permCatIds,
  //         catData: {
  //           ...prevState.catData,
  //           canView: arrV,
  //           canAdd: arrA
  //           // canEdit: arrE,
  //           // canDelete: arrD
  //         }
  //       }));
  //     }
  //   } else {
  //     this.setState(prevState => ({
  //       permCatIds: [],
  //       catData: {
  //         ...prevState.catData,
  //         canView: [],
  //         canEdit: [],
  //         canAdd: [],
  //         canDelete: []
  //       }
  //     }));
  //   }

  handleCheck = (e, cat) => {
    const { name, value } = e.target;
    const { roleGroupId, catData } = this.state;
    const newArr = catData.filter(item => item !== name);

    const checked = catData.includes(name);

    if (checked) {
      this.setState({
        catData: newArr
      });
    } else {
      this.setState({
        catData: [...catData, name]
      });
    }

    const hospBranchId = 1;
    const data = {
      catId: cat.id,
      value,
      roleGroupId,
      hospBranchId,
      checked: checked ? 0 : 1
    };

    this.props.updatePermGroup(data);
  };

  // handleCheck = (e, cat) => {
  //   const { checked, value } = e.target;
  //   const { roleGroupId } = this.state;

  //   // this.setState(prevState => ({
  //   //   catData: {
  //   //     ...prevState.catData,
  //   //     [name]: checked
  //   //   }
  //   // }));

  //   const data = {
  //     catId: cat.id,
  //     value,
  //     roleGroupId,
  //     checked: checked ? 1 : 0
  //   };

  //   this.props.updatePermGroup(data);
  // };

  checkStatus = () => {};

  componentDidMount() {
    this.props.fetchPermGroups();

    this.checkStatus();
  }

  render() {
    const { activeGroup, roleGroupId, catData, permCatIds } = this.state;
    const {
      groups,
      permGroups,
      hospitalModules,
      hospitalPermissions
    } = this.props;

    return (
      <Row>
        <Col sm="2">
          <ListGroup id="list-tab" role="tablist" className="mini-side">
            <h5 className="h-title pl-3">Groups</h5>
            <div className="pb-1">
              {groups && groups.length > 0
                ? groups.map((group, index) => {
                    return (
                      <ListGroupItem
                        key={index}
                        onClick={() => this.toggleGroups(group, index)}
                        action
                        active={activeGroup === index}
                      >
                        <span className="pl-3">{group.name}</span>
                      </ListGroupItem>
                    );
                  })
                : null}
            </div>
          </ListGroup>
        </Col>
        <Col sm="10">
          <TabContent className="tab-box" activeTab={activeGroup}>
            <TabPane tabId={activeGroup} className="animated fadeIn">
              {/* Administrators */}
              <Row>
                <Col sm="12">
                  <Card className="box" style={{ height: "529px" }}>
                    <CardHeader className="bg-warn">
                      Enable or Disable user interfaces features by checking or
                      uncheckingn the boxes below
                    </CardHeader>
                    <CardBody>
                      {/* Perm Groups */}
                      {permGroups && permGroups.length > 0
                        ? permGroups.map(perm => (
                            <div className="mb-3" key={perm.id}>
                              <h6 className="card-title bold mb-1">
                                {perm.slug === "general" ? "General" : null}
                                {hospitalModules.map(h => {
                                  if (h.slug === perm.slug) {
                                    return perm.name;
                                  }
                                })}
                              </h6>
                              {/* Categories */}
                              {hospitalPermissions.map(hPerm =>
                                perm.slug === hPerm.slug
                                  ? perm.categories.map(cat =>
                                      hPerm.categories.map(hp =>
                                        cat.id === hp.id ? (
                                          <Row key={cat.id}>
                                            <Col sm="3">
                                              <FormGroup check inline>
                                                <div className="custom-control custom-checkbox pr-3">
                                                  <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`${cat.slug}-view`}
                                                    name={`${cat.slug}-view`}
                                                    value="canView"
                                                    checked={
                                                      catData.includes(
                                                        cat.slug + "-view"
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    // disabled={
                                                    //   isEmpty(catData.canView)
                                                    //     ? false
                                                    //     : true
                                                    // }
                                                    onChange={e =>
                                                      this.handleCheck(e, cat)
                                                    }
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`${cat.slug}-view`}
                                                  >
                                                    {cat.name}
                                                  </label>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                              <FormGroup check inline>
                                                <div className="custom-control custom-checkbox pr-3">
                                                  <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`${cat.slug}-create`}
                                                    name={`${cat.slug}-create`}
                                                    value="canCreate"
                                                    checked={
                                                      catData.includes(
                                                        cat.slug + "-create"
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={e =>
                                                      this.handleCheck(e, cat)
                                                    }
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`${cat.slug}-create`}
                                                  >
                                                    Create
                                                  </label>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                              <FormGroup check inline>
                                                <div className="custom-control custom-checkbox pr-3">
                                                  <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`${cat.slug}-edit`}
                                                    name={`${cat.slug}-edit`}
                                                    value="canEdit"
                                                    checked={
                                                      catData.includes(
                                                        cat.slug + "-edit"
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={e =>
                                                      this.handleCheck(e, cat)
                                                    }
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`${cat.slug}-edit`}
                                                  >
                                                    Edit
                                                  </label>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                            <Col sm="3">
                                              <FormGroup check inline>
                                                <div className="custom-control custom-checkbox pr-3">
                                                  <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`${cat.slug}-delete`}
                                                    name={`${cat.slug}-delete`}
                                                    value="canDelete"
                                                    checked={
                                                      catData.includes(
                                                        cat.slug + "-delete"
                                                      )
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={e =>
                                                      this.handleCheck(e, cat)
                                                    }
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`${cat.slug}-delete`}
                                                  >
                                                    Delete
                                                  </label>
                                                </div>
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        ) : null
                                      )
                                    )
                                  : null
                              )}
                            </div>
                          ))
                        : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups.findGroups,
  permGroups: state.permGroups.items,
  hospitalModules: state.modules.hospitalModules,
  hospitalPermissions: state.modules.hospitalPermissions
});

const mapDispatchToProps = {
  fetchPermGroups,
  updatePermGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
