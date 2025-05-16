import { PageWrap } from "@/components/PageWrap/PageWrap";
import { PageGrid } from "@/components/PageGrid/PageGrid";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { NavWrap, NavButton, DashboardWrap } from "./Dashboard.styles";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const view = currentPath.includes("/dashboard/chart") ? "chart" : "status";

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate({ to: "/dashboard/status", replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <PageWrap>
      <DashboardWrap>
        <NavWrap>
          <Link to="/dashboard/status">
            <NavButton $isActive={view === "status"}>업데이트 현황</NavButton>
          </Link>
          <Link to="/dashboard/chart">
            <NavButton $isActive={view === "chart"}>영역 값 차트</NavButton>
          </Link>
        </NavWrap>
        <Outlet />
      </DashboardWrap>
    </PageWrap>
  );
};
