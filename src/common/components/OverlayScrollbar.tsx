import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import "overlayscrollbars/css/OverlayScrollbars.css";

interface IOverlayScrollbarProps extends React.HTMLAttributes<Element> {}

const OverlayScrollbar = ({ children }: IOverlayScrollbarProps) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "never" },
        overflowBehavior: { y: "scroll", x: "hidden" },
      }}
      style={{ height: "100%" }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default OverlayScrollbar;
