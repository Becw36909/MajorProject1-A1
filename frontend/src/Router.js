// import views
import homeView from "./views/pages/home";
import fourOFourView from "./views/pages/404";
import signinView from "./views/pages/signin";
import signupView from "./views/pages/signup";
import profileView from "./views/pages/profile";
import editProfileView from "./views/pages/editProfile";
import horsesView from "./views/pages/horses";
import serivceRequestsView from "./views/pages/serviceRequests";
import calendarView from "./views/pages/calendar";
import guideView from "./views/pages/guide";
import adminDashboardView from "./views/pages/adminDashboard";
import dashboardView from "./views/pages/dashboard";
import viewRequestsView from "./views/pages/viewRequests";
import addHorseView from "./views/pages/addHorse";
import horseView from "./views/pages/horse";

// define routes
const routes = {
  "/": homeView,
  404: fourOFourView,
  "/signin": signinView,
  "/signup": signupView,
  "/profile": profileView,
  "/editProfile": editProfileView,
  "/horses": horsesView,
  "/serviceRequests": serivceRequestsView,
  "/calendar": calendarView,
  "/guide": guideView,
  "/adminDashboard": adminDashboardView,
  "/dashboard": dashboardView,
  "/viewRequests": viewRequestsView,
  "/addHorse": addHorseView,
  "/horse": horseView,
};

class Router {
  constructor() {
    this.routes = routes;
  }

  init() {
    // initial call
    this.route(window.location.pathname);

    // on back/forward
    window.addEventListener("popstate", () => {
      this.route(window.location.pathname);
    });
  }

  route(fullPathname) {
    const pathname = fullPathname.split("?")[0];

    // manual dynamic route support
    if (pathname.startsWith("/horse/")) {
      this.routes["/horse"].init();
      return;
    }

    // exact route match
    const route = this.routes[pathname];
    if (route) {
      route.init();
    } else {
      this.routes["404"].init();
    }
  }

  gotoRoute(pathname) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    this.route(pathname);
  }

  // helper for dynamic horse route
  getHorseRoute(horseId) {
    return `/horse/${horseId}`;
  }
}

// create appRouter instance and export
const AppRouter = new Router();
export default AppRouter;

// programmatically load any route
export function gotoRoute(pathname) {
  AppRouter.gotoRoute(pathname);
}

// allows anchor <a> links to load routes
export function anchorRoute(e) {
  e.preventDefault();
  const pathname = e.target.closest("a").pathname;
  AppRouter.gotoRoute(pathname);
}
