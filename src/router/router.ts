// src/router/router.ts
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { HomeLayout } from "@/layout/HomeLayout";
import { Compare, Dashboard, Delete, EditSummary, Photo } from "@/pages";

const rootRoute = createRootRoute({ component: HomeLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/compare",
      replace: true,
    });
  },
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

const photoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/photo",
  component: Photo,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  compareRoute,
  dashboardRoute,
  deleteRoute,
  editRoute,
  photoRoute,
]);

export const router = createRouter({ routeTree });
