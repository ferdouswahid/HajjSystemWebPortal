import {Route} from "@angular/router";
import {DashboardComp} from "./DashboardComp";


export const dashBoardRouteList: Route[] = [
  //{path: '', loadComponent: () => import('./DashboardComp').then(m => m.DashboardComp)},
  {path: '', component: DashboardComp},

];
