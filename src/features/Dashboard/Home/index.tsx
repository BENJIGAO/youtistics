import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RecentSubscriptions from "features/Dashboard/Home/components/RecentSubscriptions";
import RecentLikedVideos from "features/Dashboard/Home/components/RecentLikedVideos";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/virtual";

const Home = () => {
  return (
    <Box sx={{ m: 3 }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Subscriptions
          </Typography>
        </Grid>
        <RecentSubscriptions />
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Recent Liked Videos
          </Typography>
        </Grid>
        <RecentLikedVideos />
      </Grid>
    </Box>
  );
};

export default Home;
