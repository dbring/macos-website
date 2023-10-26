import { mdiApple } from "@mdi/js";
import clsx from "clsx";
import { useState } from "react";
import { useTimeout } from "../../hooks/use-timeout";
import { AppIcon } from "../Utils/AppIcon.component";
import "./StartupChime.styles.scss";

export const StartupChime = () => {
  const [hiddenSplashScreen, setHiddenSplashScreen] = useState(false);

  useTimeout(() => {
    setHiddenSplashScreen(true);
  }, 3000);

  return (
    <>
      <div
        className={clsx({
          splashScreen: true,
          hidden: hiddenSplashScreen,
        })}
        hidden={hiddenSplashScreen}
      >
        <AppIcon path={mdiApple} fill="white" size={100} />
      </div>
      <audio
        hidden
        // autoPlay={import.meta.env.PROD}
        src="/assets/sounds/mac-startup-sound.mp3"
      />
    </>
  );
};
