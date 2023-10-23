import { mdiBluetooth, mdiKeyboard, mdiWifiStrength4 } from "@mdi/js";
import { FC } from "react";
import { AirDropSVG } from "../../../assets/sf-icons/AirDrop.svg";
import { MoonSVG } from "../../../assets/sf-icons/Moon.svg";
import { useTheme } from "../../../hooks/use-theme";
import { AppIcon } from "../../Utils/AppIcon.component";
import "./ActionCenter.styles.scss";
import { ActionCenterShell } from "./ActionCenterShell.component";
import { ActionCenterSurface } from "./ActionCenterSurface.component";
import { ActionCenterTile } from "./ActionCenterTile.component";

export const ActionCenter = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const ThemeSVGComp = MoonSVG;

  return (
    <ActionCenterShell>
      <section className="action-center-container">
        {/* Main Controls: Wifi, Bluetooth, Airdrop */}
        <ActionCenterSurface
          grid={[
            [1, 6],
            [1, 4],
          ]}
        >
          {/* Wifi goes here */}
          <ActionCenterTile grid={[1, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiWifiStrength4} size={16} />
            </Toggle>
            Wi-Fi
          </ActionCenterTile>

          {/* Bluetooth */}
          <ActionCenterTile grid={[2, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiBluetooth} size={18} />
            </Toggle>
            Bluetooth
          </ActionCenterTile>

          {/* Airdrop */}
          <ActionCenterTile grid={[3, 1]}>
            <Toggle filled={!!0}>
              <AirDropSVG size={16} />
            </Toggle>
            Airdrop
          </ActionCenterTile>
        </ActionCenterSurface>

        {/* Theme Switcher */}
        <ActionCenterSurface
          grid={[
            [7, 6],
            [1, 2],
          ]}
        >
          <ActionCenterTile grid={[1, 1]}>
            <Toggle onClick={toggleTheme} filled={theme === "dark"}>
              <ThemeSVGComp size={16} />
            </Toggle>
            Dark mode
          </ActionCenterTile>
        </ActionCenterSurface>

        {/* Keyboard Brightness */}
        <ActionCenterSurface
          grid={[
            [7, 6],
            [3, 2],
          ]}
        >
          <ActionCenterTile grid={[1, 1]}>
            <Toggle filled={!0}>
              <AppIcon path={mdiKeyboard} size={16} />
            </Toggle>
            Keyboard
          </ActionCenterTile>
        </ActionCenterSurface>
      </section>
    </ActionCenterShell>
  );
};

const Toggle: FC<{ filled: boolean } & JSX.IntrinsicElements["button"]> = ({
  filled,
  children,
  ...props
}) => (
  <button
    className="toggle"
    style={
      {
        "--bgcolor": `var(--app-color-${filled ? "primary" : "dark"}-hsl)`,
        "--bgalpha": filled ? 1 : 0.1,

        "--svgcolor": `var(--app-color-${
          filled ? "primary" : "light"
        }-contrast-hsl)`,
        "--svgalpha": filled ? 1 : 0.9,
      } as React.CSSProperties
    }
    {...props}
  >
    {children}
  </button>
);
