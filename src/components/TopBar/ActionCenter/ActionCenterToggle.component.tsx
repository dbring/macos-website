import clsx from "clsx";
import { useRef, useState } from "react";
import { SwitchSVG } from "../../../assets/sf-icons/switch.svg";
import { useOutsideClick } from "../../../hooks/use-click-outside";
import { useFocusOutside } from "../../../hooks/use-focus-outside";
import { TopBarIconButton } from "../TopBarIconButton.component";
import { ActionCenter } from "./ActionCenter.component";
import "./ActionCenterToggle.styles.scss";

export const ActionCenterToggle = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"visible" | "hidden">("hidden");

  const show = () => setState("visible");
  const hide = () => setState("hidden");

  useOutsideClick(containerRef, hide);
  useFocusOutside(containerRef, hide);

  return (
    <div className="action-center-toggle-container" ref={containerRef}>
      <span>
        <TopBarIconButton onClick={show} onFocus={show}>
          <SwitchSVG />
        </TopBarIconButton>
      </span>
      <div
        className={clsx(
          "action-center-menu-parent",
          state === "hidden" && "hidden"
        )}
      >
        <ActionCenter />
      </div>
    </div>
  );
};
