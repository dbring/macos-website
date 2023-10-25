import { useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { RovingTabIndexProvider } from "react-roving-tabindex";
import { appsConfig } from "../../data/apps/apps-config";
import { openAppsStore } from "../../stores/Apps.store";
import "./Dock.styles.scss";
import { DockItem } from "./DockItem";

export const Dock = () => {
  const [openApps] = useAtom(openAppsStore);

  const mouseX = useMotionValue<number | null>(null);

  return (
    <section id="dock" className="dock-container">
      <div
        className="dockEl"
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        <RovingTabIndexProvider options={{ direction: "horizontal" }}>
          {Object.keys(appsConfig).map((appID, i) => {
            return (
              <>
                {appsConfig[appID].dockBreaksBefore && (
                  <div
                    className="dock-divider"
                    key={`${appID}-divider`}
                    aria-hidden="true"
                  />
                )}
                <DockItem
                  index={i}
                  key={appID}
                  mouseX={mouseX}
                  appID={appID}
                  isOpen={openApps[appID]}
                  {...appsConfig[appID]}
                />
              </>
            );
          })}
        </RovingTabIndexProvider>
      </div>
    </section>
  );
};
