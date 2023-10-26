import clsx from "clsx";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";
import { CloseIcon } from "../../../assets/traffic-icons/Close.svg";
import { GreenLightIcon } from "../../../assets/traffic-icons/GreenLightIcon";
import { MinimizeIcon } from "../../../assets/traffic-icons/Minimize.svg";
import { appsConfig } from "../../../data/apps/apps-config";
import {
  AppID,
  activeAppStore,
  openAppsStore,
} from "../../../stores/Apps.store";
import "./TrafficLights.styles.scss";

type TrafficLightProps = {
  appID: AppID;
  onMaximizeClick: () => void;
  class?: string | null;
};

export const TrafficLights = ({
  appID,
  onMaximizeClick,
  class: className,
}: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const greenLightAction = () => {
    if (appsConfig[appID].expandable) {
      // Action not available right now!
    } else {
      onMaximizeClick();
    }
  };

  return (
    <div
      className={clsx(
        "traffic-lights-container",
        activeApp !== appID && "unFocussed"
      )}
    >
      <button className="closeLight" onClick={closeApp}>
        <CloseIcon />
      </button>
      <button className="minimizeLight">
        <MinimizeIcon />
      </button>
      <button className="stretchLight" onClick={greenLightAction}>
        <GreenLightIcon {...appsConfig[appID]} />
      </button>
    </div>
  );
};
