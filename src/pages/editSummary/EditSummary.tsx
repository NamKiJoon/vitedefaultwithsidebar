import { PageWrap } from "@/components/PageWrap/PageWrap";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { NavWrap, NavButton, EditWrap } from "./EditSummary.styles";
import { useEffect } from "react";

export const EditSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const view = currentPath.includes("/edit/contents")
    ? "contents"
    : "summation";

  useEffect(() => {
    if (location.pathname === "/edit") {
      navigate({ to: "/edit/contents", replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <PageWrap>
      <EditWrap>
        <NavWrap>
          <Link to="/edit/contents">
            <NavButton $isActive={view === "contents"}>콘텐츠 수정</NavButton>
          </Link>
          <Link to="/edit/summation">
            <NavButton $isActive={view === "summation"}>요약 수정</NavButton>
          </Link>
        </NavWrap>
        <Outlet />
      </EditWrap>
    </PageWrap>
  );
};
