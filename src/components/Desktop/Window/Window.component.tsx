import clsx from "clsx";
import { useAtom } from "jotai";
import {
  RefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Rnd } from "react-rnd";
import { appsConfig } from "../../../data/apps/apps-config";
import { randint } from "../../../helpers/random";
import {
  AppID,
  activeAppStore,
  activeAppZIndexStore,
} from "../../../stores/Apps.store";
import { AppNexus } from "../../Apps/AppNexus.component";
import { TrafficLights } from "./TrafficLights.component";
import "./Window.styles.scss";

type WindowProps = {
  appID: AppID;
};

type WindowSize = {
  width: string | number;
  height: string | number;
};

type WindowPosition = {
  x: number;
  y: number;
};

class WindowRnd extends Rnd {
  base?: HTMLDivElement;
}

export const Window = ({ appID }: WindowProps) => {
  const [activeAppZIndex] = useAtom(activeAppZIndexStore);
  const [activeApp, setActiveApp] = useAtom(activeAppStore);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [appZIndex, setAppZIndex] = useState(0);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const randX = useMemo(() => randint(-600, 600), []);
  const randY = useMemo(() => randint(-100, 100), []);

  const windowRef = useRef<WindowRnd | null>(null);
  const maximizeApp = useMaximizeWindow(windowRef);

  useEffect(() => {
    if (activeApp === appID) setAppZIndex(activeAppZIndex);
  }, [activeApp]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const { resizable, height, width, trafficLightsStyle } = appsConfig[appID];

  const focusCurrentApp = () => {
    setActiveApp(appID);
  };

  return (
    <Rnd
      ref={windowRef}
      style={{ zIndex: appZIndex }}
      default={{
        height: height ? height : 300,
        width: width ? width : 300,
        x: ((3 / 2) * document.body.clientWidth + randX) / 2,
        y: (100 + randY) / 2,
      }}
      enableResizing={resizable}
      dragHandleClassName="app-window-drag-handle"
      bounds="parent"
      minWidth="300"
      minHeight="300"
      onDragStart={() => {
        focusCurrentApp();
        setIsBeingDragged(true);
      }}
      onDragStop={() => setIsBeingDragged(false)}
    >
      <section
        className="window-container"
        tabIndex={-1}
        ref={containerRef}
        onClick={focusCurrentApp}
      >
        <div
          style={trafficLightsStyle}
          className={clsx("trafficLightsContainer", "app-window-drag-handle")}
        >
          <TrafficLights appID={appID} onMaximizeClick={maximizeApp} />
        </div>
        <Suspense fallback={<span></span>}>
          <AppNexus appID={appID} isBeingDragged={isBeingDragged} />
        </Suspense>
      </section>
    </Rnd>
  );
};

/**
 * Extract the x and y from the transform style of the base element using Regex
 * Why using this hacking method:
 * react-rnd uses transform and translate to shift window around instead of top
 * and left and it does not provide the access to x and y values from ref
 * @param transformStyle The transform style string. e.g. translate(1123.75px, 7px)
 * @returns The window position. e.g. { x: 1123.75, y: 7 }
 */
function extractPositionFromTransformStyle(
  transformStyle: string
): WindowPosition {
  const matched = transformStyle.matchAll(/[0-9.]+/g);
  try {
    return {
      x: Number(matched.next().value[0]),
      y: Number(matched.next().value[0]),
    };
  } catch {
    return { x: 0, y: 0 };
  }
}

const useMaximizeWindow = (windowRef: RefObject<WindowRnd>) => {
  const originalSizeRef = useRef<WindowSize>({ height: 0, width: 0 });
  const originalPositionRef = useRef<WindowPosition>({
    x: 0,
    y: 0,
  });
  const transitionClearanceRef = useRef<NodeJS.Timeout | number>();

  return () => {
    if (
      !windowRef?.current?.resizableElement?.current ||
      !windowRef?.current?.base
    ) {
      return;
    }

    // Get desktop height and width
    const dockElementHeight =
      document.getElementById("dock")?.clientHeight ?? 0;
    const topBarElementHeight =
      document.getElementById("top-bar")?.clientHeight ?? 0;
    const desktopHeight =
      document.body.clientHeight - dockElementHeight - topBarElementHeight;
    const deskTopWidth = document.body.clientWidth;

    // Get current height and width
    const { clientWidth: windowWidth, clientHeight: windowHeight } =
      windowRef.current.resizableElement.current;

    // Get current left and top position
    const { x: windowLeft, y: windowTop } = extractPositionFromTransformStyle(
      windowRef.current.base.style.transform
    );

    // Only when maximizing (not dragging or resizing), should it have transition
    windowRef.current.base.style.transition =
      "height 0.3s ease, width 0.3s ease, transform 0.3s ease";

    // Prevent removing transition styles when multiple times of maximizing action takes place in a short period
    clearTimeout(transitionClearanceRef.current);

    // Transition style gets cleared after 0.5 second as transition only lasts 0.5 second
    transitionClearanceRef.current = setTimeout(() => {
      if (windowRef.current?.base) {
        windowRef.current.base.style.transition = "";
      }
      transitionClearanceRef.current = 0;
    }, 300);

    // When it's already maximized, revert the window to the previous size
    if (windowWidth === deskTopWidth && windowHeight === desktopHeight) {
      windowRef.current.updateSize(originalSizeRef.current);
      windowRef.current.updatePosition(originalPositionRef.current);
    }
    // Maximize the window to the size of the desktop
    else {
      originalSizeRef.current = { width: windowWidth, height: windowHeight };
      originalPositionRef.current = { x: windowLeft, y: windowTop };

      windowRef.current.updateSize({
        height: desktopHeight,
        width: deskTopWidth,
      });

      windowRef.current.updatePosition({
        x: document.body.clientWidth / 2,
        y: 0,
      });
    }
  };
};

export default Window;
