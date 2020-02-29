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
import { fetchUser, fetchRoomStatus } from "../../redux/actions/userActions";
import { fetchDepartment } from "../../redux/actions/depActions";
import { fetchQueues } from "../../redux/actions/queueActions";
import { showModules } from "../../redux/actions/moduleActions";
import { fetchPositions } from "../../redux/actions/positionActions";
import { fetchClients } from "../../redux/actions/clientActions";
import { fetchIds } from "../../redux/actions/idsActions";
import { showPermGroup } from "../../redux/actions/permActions";
import { fetchBranches } from "../../redux/actions/branchActions";
import SearchBox from "./SearchBox";
import { SystemDashboard, AlertBox } from "./Modals";
import AuthService from "../../config/auth";
import { uniqBy } from "lodash";
// import server from "../../server";

// import modulesConfig from "../../routes/ModulesConfig";

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
      dashMod: false,
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
    // find  hospital modules
    const client = JSON.parse(localStorage.getItem("client"));
    this.props.showModules(client.clientId);
    //show module permissions
    this.props.showPermGroup(client.clientId);
    // fetch branches
    this.props.fetchBranches(client.clientId);
    // initiate user
    this.props.fetchUser().then(() => {
      const { user, location, hospModules, configModules } = this.props;
      if (user !== null) {
        // set branch & room
        this.props.fetchRoomStatus();
        // set modules
        if (hospModules && hospModules.length > 0) {
          let modules = [];
          hospModules.forEach(el => {
            modules.push(el.slug);
          });
          if (modules) {
            modules = [...modules, "general", "last_common"];
            const pathname = location.pathname;
            //redirect to dashboard
            if (pathname === "/admin/dashboard") {
              modules.unshift("adminDashboard");
            } else if (pathname === "/user/dashboard") {
              modules.unshift("userDashboard");
            } else {
              modules.unshift("patientDashboard");
            }
            let allowedModules = modules.reduce((acc, md) => {
              return [...acc, ...configModules[md].routes];
            }, []);
            // For removing settings entries, compare with 'name'.
            allowedModules = uniqBy(allowedModules, "name");
            this.setState({ allowedModules });
          } else {
            this.props.history.push("/");
          }
        }

        // set online users
        this.onlineUsers(user);
      }
    });
    this.props.fetchClients(); // fetch clients
    this.props.fetchDepartment(); // fetch departments
    this.props.fetchQueues(); // fetch queues
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
  };

  onlineUsers = user => {
    // window.Echo.channel(`laravel_database_settings-channel`).listen(
    //   "SettingsEvents",
    //   e => {
    //     console.log(e);
    //   }
    // );
    // window.Echo.private("users." + user.id).notification(notification => {
    //   console.log(notification.type);
    // });
  };

  componentDidMount() {
    // start server
    // server();
    //initiate funcs
    this.initState();
  }

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

  // fn system dashboard toggle
  systemDashboardToggle = () => {
    const { dashMod } = this.state;
    this.setState({
      dashMod: !dashMod
    });
  };

  // fn alert box toggle
  alertBoxToggle = () => {
    const { alertMd } = this.state;
    this.setState({
      alertMd: !alertMd
    });
  };

  render() {
    const { dashMod, searchMod, allowedModules } = this.state;

    const RouteComponent = (route, idx) => {
      return route.component ? (
        <Route
          key={idx}
          path={route.url}
          exact={route.exact}
          name={route.name}
          render={() => (
            <route.component searchModal={this.searchModal} {...this.props} />
          )}
        />
      ) : null;
    };

    const RouteRedirect = () => {
      const { cookies, location } = this.props;
      const level = cookies.get("level");
      if (parseInt(level) === 1) {
        return location.pathname === "/user/dashboard" ? null : (
          <Redirect from="/" to="/user/dashboard" />
        );
      } else if (parseInt(level) === 2) {
        return location.pathname === "/admin/dashboard" ? null : (
          <Redirect from="/" to="/admin/dashboard" />
        );
      } else if (parseInt(level) === 0) {
        return location.pathname === "/patient/dashboard" ? null : (
          <Redirect from="/" to="/patient/dashboard" />
        );
      }
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
              systemDashboardToggle={this.systemDashboardToggle}
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
              ) : null}
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
                  {/* redirect to dashboard */}
                  {RouteRedirect()}
                </Switch>
              </Suspense>

              {/* Search Modal */}
              <SearchBox
                {...this.props}
                toggleSearch={e => this.searchModal(e)}
                searchMod={searchMod}
              />
              {/* Modals */}
              <SystemDashboard
                dashMod={dashMod}
                systemDashboardToggle={this.systemDashboardToggle}
                {...this.props}
              />
              {/* alert */}
              <AlertBox alertBoxToggle={this.alertBoxToggle} {...this.props} />
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

const mapStateToProps = (state, ownProps) => ({
  cookies: ownProps.cookies,
  user: state.user.user,
  userLoading: state.user.userLoading,
  hospModules: state.modules.hospitalModules,
  configModules: state.modules.configModules
});

const mapDispatchToProps = {
  showModules,
  showPermGroup,
  fetchUser,
  fetchDepartment,
  fetchQueues,
  fetchPositions,
  fetchClients,
  fetchIds,
  fetchRoomStatus,
  fetchBranches
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
