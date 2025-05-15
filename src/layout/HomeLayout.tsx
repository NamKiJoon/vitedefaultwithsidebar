import { AppBar, Box, Toolbar, CssBaseline } from "@mui/material";
import { Link, Outlet } from "@tanstack/react-router";
import { NavBox } from "./HomeLayout.styles";

export const HomeLayout = () => {
  const navLinks = [
    { label: "Home", to: "/home" },
    // { label: "비교", to: "/compare" },
    { label: "현황판", to: "/dashboard" },
    { label: "노동신문 수정", to: "/edit" },
    { label: "이미지 관리", to: "/photo" },
    // { label: "삭제", to: "/delete" },
    { label: "모델 재처리", to: "/model" },
    { label: "관리자 전용", to: "/admin" },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" sx={{ height: 64, bgcolor: "#2a2d3e" }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            minHeight: 64,
            // border: "1px solid red",
            padding: "30px",
          }}
        >
          <Box>
            <NavBox>
              {navLinks.map((link) => (
                <Link
                  className="nav-link"
                  key={link.label}
                  to={link.to}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </NavBox>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: "#dedede",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
