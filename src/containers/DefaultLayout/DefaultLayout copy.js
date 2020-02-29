import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
import $ from "jquery";
import PropTypes from "prop-types";
import navigation from "../../_nav";
import "react-datepicker/dist/react-datepicker.css";
import * as router from "react-router-dom";
import { connect } from "react-redux";
import { ReactTableDefaults } from "react-table";
import { fetchUser } from "../../redux/actions/userActions";
import { fetchDepartment } from "../../redux/actions/depActions";
import { fetchQueues } from "../../redux/actions/queueActions";
import { fetchModules } from "../../redux/actions/moduleActions";
import { fetchPositions } from "../../redux/actions/positionActions";
import { fetchClients } from "../../redux/actions/clientActions";
import { fetchIds } from "../../redux/actions/idsActions";
import { showGroups } from "../../redux/actions/groupActions";
import SearchBox from "./SearchBox";
import AuthService from "../../config/auth";
// import server from "../../server";
// import axios from "axios";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

let Auth = new AuthService();

class DefaultLayout extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
    fetchPatients: PropTypes.func,
    logoutUser: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchMod: false,
      allowedRoutes: [],
      allowedModules: []
    };
  }

  loadingBody = () => (
    <div
      className="animated fadeIn pt-1 text-center d-flex justify-content-center"
      style={{ margin: "40px auto" }}
    >
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  loadingSidebar = () => (
    <div
      className="animated fadeIn pt-1 text-center d-flex justify-content-center"
      style={{ margin: "195px auto" }}
    >
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-wave  m-0 ">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
        &nbsp;
        <div className="sk-rect sk-rect5" />
      </div>
    </div>
  );

  initState = () => {
    this.props.fetchUser().then(data => {
      const user = data.user;

      const hospId = user.hospId;
      this.props.showGroups(hospId);

      // set modules
      this.setState({
        allowedModules: data.allowedModules
      });

      // set online users
      // this.onlineUsers(user);
    });

    this.props.fetchClients(); // fetch clients
    this.props.fetchDepartment(); // fetch departments
    this.props.fetchQueues(); // fetch queues
    this.props.fetchQueues(); // fetch queues
    this.props.fetchModules(); // fetch modules
    this.props.fetchPositions(); // fetch positions
    this.props.fetchIds(); // fetch ids

    // React table defaults
    Object.assign(ReactTableDefaults, {
      pageSizeOptions: [14, 30, 40, 50],
      defaultPageSize: 14,
      noDataText: "",
      loadingText: (
        <div className="animated fadeIn text-center">
          <div className="sk-spinner sk-spinner-pulse" />
        </div>
      )
    });

    // start server
    // server();
  };

  onlineUsers = user => {
    // window.Echo.private(`users.${user.id}`).notification(notification => {
    //   console.log(notification.type);
    // });
    // window.Echo.private("users." + user.id).notification(notification => {
    //   console.log(notification.type);
    // });
  };

  componentDidMount() {
    this.initState();
  }

  // componentDidMount() {
  //   // axios
  //   //   .get("http://localhost:6001/apps/07f1332b6512384a/status")
  //   //   .then(res => {
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //   });
  // }

  signOut = e => {
    e.preventDefault();
    // this.props.logoutUser().then(() => {
    Auth.destroyToken();
    this.props.history.push("/auth/login");
    // });
  };

  toChats = e => {
    $(".sidebar").addClass("bgs");
    $(".breadcrumb").addClass("hidden");
    $(".app-footer").addClass("hidden");
    $("body").addClass("aside-menu-lg-show");
    $(".dnav").addClass("hidden");

    this.props.history.push("/communication/chatbox");
  };

  toSettings = e => {
    this.props.history.push("/settings");
  };

  searchModal = () => {
    const { searchMod } = this.state;
    this.setState({
      searchMod: !searchMod
    });
  };

  render() {
    const { searchMod, allowedModules, allowedRoutes } = this.state;

    const RouteComponent = (route, idx) => {
      return route.component ? (
        <Route
          key={idx}
          path={route.url}
          exact={route.exact}
          name={route.name}
          render={props => (
            <route.component searchModal={this.searchModal} {...props} />
          )}
        />
      ) : null;
    };

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              user={this.props.user}
              onLogout={e => this.signOut(e)}
              onSms={e => this.toChats(e)}
              searchModal={this.searchModal}
              {...this.props}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              {allowedModules && allowedModules.length > 0 ? (
                <AppSidebarNav
                  navConfig={navigation(allowedModules)}
                  {...this.props}
                  router={router}
                />
              ) : (
                ""
              )}
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {allowedModules && allowedModules.length > 0 ? (
              <AppBreadcrumb appRoutes={allowedModules} />
            ) : null}
            <Container fluid>
              <Suspense fallback={this.loadingBody()}>
                <Switch>
                  {allowedModules && allowedModules.length > 0
                    ? allowedModules.map((route, idx) =>
                        RouteComponent(route, idx)
                      )
                    : null}

                  {/*                     
                    {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.nameRouteComponent}
                        render={props => (
                          <route.component
                            searchModal={this.searchModal}
                            {...props}
                          />
                        )}
                      />  
                    ) : null;
                  })} */}

                  <Redirect from="/" to="/admin/dashboard" />
                </Switch>
              </Suspense>

              {/* Search Modal */}
              <SearchBox
                {...this.props}
                toggleSearch={e => this.searchModal(e)}
                searchMod={searchMod}
              />
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loadingSidebar()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = {
  fetchUser,
  fetchDepartment,
  fetchQueues,
  fetchModules,
  fetchPositions,
  fetchClients,
  fetchIds,
  showGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
