import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Copyright from "common/components/Copyright";
import YoutisticsLogo from "common/components/YoutisticsLogo";
import AuthButton from "./AuthButton";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];
const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

function PricingContent() {
  return (
    <>
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
        sx={{ pt: 8, display: "flex", flexDirection: "column" }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="center"
          color="text.primary"
          gutterBottom
        >
          View your viewing habits
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          In a never-seen-before app, you can now view your viewing habits on
          YouTube, for free!
        </Typography>
        <Container sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <AuthButton />
        </Container>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
