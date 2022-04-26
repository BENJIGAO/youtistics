import * as React from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const CustomPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          position: "absolute",
          left: 6,
          top: 6,
          zIndex: 1,
          fontSize: 22,
        }}
        color="primary"
      >
        <HelpOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ width: 500 }}
      >
        <Typography sx={{ p: 2 }} variant="body2">
          Every channel have topic(s) associated with it (the list can be seen{" "}
          <Link
            href="https://gist.github.com/stpe/2951130dfc8f1d0d1a2ad736bef3b703?permalink_comment_id=4128880#gistcomment-4128880"
            target="_blank"
            rel="noopener"
          >
            here
          </Link>
          ). They categorize the type of content that the channel produces. Each
          topic falls under more general topics (e.g., Gaming, Sports, etc.,).
          This pie chart shows the distribution of these general topics based on
          your most recent subscriptions.
        </Typography>
      </Popover>
    </div>
  );
};

export default CustomPopover;
