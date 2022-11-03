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
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#E5E5F7",
        backgroundImage:
          "repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #f6cbbc55, #f6cbbc )",
      }}
    >
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <YoutisticsLogo isWhite />
          <nav>
            <Link
              variant="button"
              href="https://github.com/BENJIGAO/youtistics"
              underline="hover"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              GitHub
            </Link>
            <Link
              variant="button"
              href="https://briangao.me/"
              underline="hover"
              sx={{ my: 1, mx: 1.5, color: "white" }}
            >
              Author
            </Link>
            <Link
              variant="button"
              href="https://www.youtube.com/channel/UCRoUmX2xxFlN_NuM2cC-p_Q"
              underline="hover"
              sx={{ my: 1, mx: 1.5, color: "white" }}
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
          In a never-seen-before app, explore your YouTube statistics! See
          whether you watch more gaming videos than cooking, your favourite
          channel, and much more!
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
