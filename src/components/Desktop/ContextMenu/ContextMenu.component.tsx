import { ReactNode, RefObject, useEffect, useRef } from "react";
import {
  RovingTabIndexProvider,
  useFocusEffect,
  useRovingTabIndex,
} from "react-roving-tabindex";
import { contextMenuConfig } from "../../../data/menu/context.menu.config";
import { useContextMenu } from "../../../hooks/use-context-menu";
import { useFocusOutside } from "../../../hooks/use-focus-outside";
import "./ContextMenu.styles.scss";

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

export const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible, setIsMenuVisible } =
    useContextMenu(outerRef);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const defaultMenu = contextMenuConfig.default;

  useEffect(() => {
    isMenuVisible && containerRef.current && containerRef.current.focus();
  }, [isMenuVisible]);

  useFocusOutside(containerRef, () => isMenuVisible && setIsMenuVisible(false));

  return isMenuVisible ? (
    <div
      className="contextContainer"
      tabIndex={-1}
      ref={containerRef}
      style={{ top: yPos, left: xPos }}
    >
      <RovingTabIndexProvider
        options={{ direction: "vertical", loopAround: true }}
      >
        {Object.keys(defaultMenu).map((key) => (
          <>
            <ContextMenuButton>{defaultMenu[key].title}</ContextMenuButton>
            {(defaultMenu[key] as any).breakAfter && (
              <div className="context-divider"></div>
            )}
          </>
        ))}
      </RovingTabIndexProvider>
    </div>
  ) : (
    <></>
  );
};

type ContextMenuButtonProps = {
  children: ReactNode;
};

const ContextMenuButton = ({ children }: ContextMenuButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    false
  );

  useFocusEffect(focused, ref);

  return (
    <button
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={tabIndex}
      ref={ref}
      className="context-menuItem"
    >
      {children}
    </button>
  );
};
