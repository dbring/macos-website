import { useAtom } from "jotai";
import { Suspense, lazy, useEffect } from "react";
import { appsConfig } from "../../../data/apps/apps-config";
import {
  activeAppStore,
  activeAppZIndexStore,
  openAppsStore,
} from "../../../stores/Apps.store";
import "./WindowsArea.styles.scss";

const Window = lazy(() => import("./Window.component"));

export const WindowsArea = () => {
  const [openApps] = useAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);
  const [activeAppZIndex, setActiveAppZIndex] = useAtom(activeAppZIndexStore);

  // Update the active app Z Index here
  useEffect(() => {
    setActiveAppZIndex(activeAppZIndex + 2);
  }, [activeApp]);

  return (
    <section className="windows-area-container">
      <Suspense fallback={<span></span>}>
        {Object.keys(appsConfig).map(
          (appID) =>
            openApps[appID] &&
            appsConfig[appID].shouldOpenWindow && (
              <Window key={appID} appID={appID} />
            )
        )}
      </Suspense>
    </section>
  );
};
