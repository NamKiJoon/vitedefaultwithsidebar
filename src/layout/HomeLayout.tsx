import { AppBar, Box, Toolbar, CssBaseline } from "@mui/material";
import { Link, Outlet } from "@tanstack/react-router";

export const HomeLayout = () => {
  const navLinks = [
    { label: "비교", to: "/compare" },
    { label: "현황판", to: "/dashboard" },
    { label: "요약수정", to: "/edit" },
    { label: "사진", to: "/photo" },
    { label: "삭제", to: "/delete" },
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
            padding: 4,
          }}
        >
          <Box>
            <Box display="flex" gap={4}>
              {navLinks.map((link) => (
                <Link
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
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: "#dedede",
          flex: 1,
          p: 4,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
