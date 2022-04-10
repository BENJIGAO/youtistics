import * as React from "react";

interface IHomeNavbarProps {}

const HomeNavbar: React.FC<IHomeNavbarProps> = (props) => {
  return (
    <div>
      <div>
        <div>Youtistics</div>
        <div>Get Started</div>
        <div>Developer</div>
      </div>
    </div>
  );
};

export default HomeNavbar;
