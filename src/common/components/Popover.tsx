import * as React from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

interface ICustomPopoverProps extends React.HTMLAttributes<Element> {}

const CustomPopover = ({ children }: ICustomPopoverProps) => {
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
        {children}
      </Popover>
    </div>
  );
};

export default CustomPopover;
