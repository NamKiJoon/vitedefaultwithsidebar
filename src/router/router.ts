// src/router/router.ts
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { HomeLayout } from "@/layout/HomeLayout";
import {
  Home,
  Compare,
  Dashboard,
  Delete,
  EditSummary,
  Photo,
  Models,
  Admin,
} from "@/pages";

import { Status } from "@/pages/dashboard/status/Status";
import { Chart } from "@/pages/dashboard/chart/Chart";
import { Contents } from "@/pages/editSummary/contents/Contents";
import { Summation } from "@/pages/editSummary/summation/Summation";

const rootRoute = createRootRoute({ component: HomeLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/home",
      replace: true,
    });
  },
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: Compare,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const statusRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/status",
  component: Status,
});
const chartRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/chart",
  component: Chart,
});

const deleteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delete",
  component: Delete,
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit",
  component: EditSummary,
});

const contentsRoute = createRoute({
  getParentRoute: () => editRoute,
  path: "/contents",
  component: Contents,
});
const summationRoute = createRoute({
  getParentRoute: () => editRoute,
  path: "/summation",
  component: Summation,
});

const modelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/model",
  component: Models,
});

const photoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/photo",
  component: Photo,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  compareRoute,
  dashboardRoute,
  deleteRoute,
  editRoute,
  photoRoute,
  modelRoute,
  homeRoute,
  adminRoute,
]);

dashboardRoute.addChildren([statusRoute, chartRoute]);
editRoute.addChildren([contentsRoute, summationRoute]);
export const router = createRouter({ routeTree });
