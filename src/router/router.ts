// src/router/router.ts
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { HomeLayout } from "@/layout/HomeLayout";
import { Home, About } from "@/pages";

const rootRoute = createRootRoute({ component: HomeLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = createRouter({ routeTree });
