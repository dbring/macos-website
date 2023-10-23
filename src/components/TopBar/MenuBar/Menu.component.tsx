import clsx from "clsx";
import { useRef } from "react";
import {
  RovingTabIndexProvider,
  useFocusEffect,
  useRovingTabIndex,
} from "react-roving-tabindex";
import "./Menu.styles.scss";

type MenuProps = {
  menu: any;
};

export const Menu = ({ menu }: MenuProps) => {
  return (
    <div className="menu-container" tabIndex={-1}>
      <RovingTabIndexProvider
        options={{ direction: "vertical", loopAround: true }}
      >
        {Object.keys(menu).map((key) => (
          <>
            <MenuItemButton
              key={key}
              className={clsx("menuItem", menu[key].disabled && "disabled")}
              disabled={menu[key].disabled}
            >
              {menu[key].title}
            </MenuItemButton>
            {menu[key].breakAfter && (
              <div key={`divider-${key}`} className="divider" />
            )}
          </>
        ))}
      </RovingTabIndexProvider>
    </div>
  );
};

const MenuItemButton = ({
  children,
  disabled = false,
  ...props
}: JSX.IntrinsicElements["button"]) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );

  useFocusEffect(focused, ref);

  return (
    <button
      tabIndex={tabIndex}
      ref={ref}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
