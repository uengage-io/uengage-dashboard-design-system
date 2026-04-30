import * as React from "react";
import UENGAGE_ICON from "../../../assets/uEngage_icon.png";

export interface LoaderProps {}

function Loader(_props: LoaderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="ue-loader-overlay" role="status" aria-label="Loading">
      <div className="ue-loader">
        <span className="ue-inner-loader" />
        <img
          src={UENGAGE_ICON}
          alt="uEngage"
          width={60}
          height={60}
          draggable={false}
        />
      </div>
    </div>
  );
}

Loader.displayName = "Loader";

export { Loader };
