import { lazy } from "react";
import { AppID } from "../../stores/Apps.store";

type AppNexusProps = {
  appID: AppID;
  isBeingDragged: boolean;
};

const Calculator = lazy(() => import("./Calculator/Calculator.component"));
const VSCode = lazy(() => import("./VSCode/VSCode.component"));
const Calendar = lazy(() => import("./Calendar/Calendar.component"));

const PlaceholderApp = lazy(
  () => import("./Placeholder/Placeholder.component")
);

export const AppNexus = ({ appID, isBeingDragged }: AppNexusProps) => {
  if (appID === "calculator") return <Calculator />;
  if (appID === "vscode") return <VSCode isBeingDragged={isBeingDragged} />;
  if (appID === "calendar") return <Calendar />;

  return <PlaceholderApp appID={appID} />;
};
