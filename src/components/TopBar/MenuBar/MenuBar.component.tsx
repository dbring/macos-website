import { mdiApple } from "@mdi/js";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useRef } from "react";
import { AppleMenuConfigType } from "../../../helpers/create-menu-config";
import { useOutsideClick } from "../../../hooks/use-click-outside";
import { useFocusOutside } from "../../../hooks/use-focus-outside";
import {
  activeMenuStore,
  menuBarMenusStore,
} from "../../../stores/MenuBar.store";
import { AppIcon } from "../../Utils/AppIcon.component";
import { Menu } from "./Menu.component";
import "./MenuBar.styles.scss";

export const MenuBar = () => {
  const [currentAppMenus] = useAtom(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const isValidMenuKey = (key: string): key is keyof AppleMenuConfigType => {
    return key in currentAppMenus;
  };

  /** Close when document focus isn't in any menubar */
  useFocusOutside(parentRef, () => setActiveMenu(""));

  /** Close when clicked outside */
  useOutsideClick(parentRef, () => setActiveMenu(""));

  return (
    <div className="menu-bar-container" ref={parentRef}>
      {Object.keys(currentAppMenus).map((menuID) => {
        if (isValidMenuKey(menuID)) {
          return (
            <div key={menuID}>
              <span style={{ height: "100%" }}>
                <button
                  onClick={() => setActiveMenu(menuID)}
                  onMouseOver={() => activeMenu && setActiveMenu(menuID)}
                  onFocus={() => setActiveMenu(menuID)}
                  className={clsx({
                    menuButton: true,
                    defaultMenu: menuID === "default",
                    appleIconButton: menuID === "apple",
                  })}
                  style={
                    {
                      "--scale": activeMenu === menuID ? 1 : 0,
                    } as React.CSSProperties
                  }
                >
                  {menuID === "apple" ? (
                    <AppIcon size={18} path={mdiApple} />
                  ) : (
                    currentAppMenus[menuID].title
                  )}
                </button>
              </span>
              <div
                className="menu-bar-parent"
                style={{
                  visibility: activeMenu !== menuID ? "hidden" : "visible",
                }}
              >
                <Menu menu={currentAppMenus[menuID].menu} />
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
