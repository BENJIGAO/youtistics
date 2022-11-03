import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Copyright from "common/components/Copyright";
import YoutisticsLogo from "common/components/YoutisticsLogo";
import AuthButton from "./AuthButton";

const Home = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <YoutisticsLogo />
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="https://github.com/BENJIGAO/youtistics"
              sx={{ my: 1, mx: 1.5 }}
            >
              GitHub
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="https://briangao.me/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Author
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="https://www.youtube.com/channel/UCRoUmX2xxFlN_NuM2cC-p_Q"
              sx={{ my: 1, mx: 1.5 }}
            >
              Demo
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          sx={{ color: "black" }}
        >
          View your viewing habits
        </Typography>
        <Typography variant="h5" align="center" component="p">
          In a never-seen-before app, you can now view your viewing habits on
          YouTube, for free!
        </Typography>
        <Container sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <AuthButton />
        </Container>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
};

export default Home;
