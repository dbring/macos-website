import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";
import { RefObject, useRef, useState } from "react";
import { useRaf } from "rooks";
import { AppConfig } from "../../helpers/create-app-config";
import { activeAppStore, AppID, openAppsStore } from "../../stores/Apps.store";
import "./DockItem.styles.scss";

type DockItemProps = AppConfig & {
  mouseX: MotionValue<number | null>;
  appID: AppID;
  isOpen: boolean;
  index: number;
};

export const DockItem = ({
  title,
  externalAction,
  mouseX,
  appID,
  isOpen,
  shouldOpenWindow,
}: DockItemProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [, setActiveApp] = useAtom(activeAppStore);
  const [animateObj, setAnimateObj] = useState({
    translateY: "0%",
  });

  const imgRef = useRef<HTMLImageElement | null>(null);

  const { width } = useDockHoverAnimation(mouseX, imgRef);

  const openApp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!shouldOpenWindow) return void externalAction?.(e);

    setOpenApps((apps) => {
      apps[appID] = true;
      return apps;
    });
    setActiveApp(appID);
  };

  const handleTap = () => {
    setAnimateObj({ translateY: "-39.2" });
    setTimeout(() => {
      setAnimateObj({ translateY: "0%" });
    }, 500);
  };

  return (
    <button
      className="dockItemButton"
      aria-label={`Launch ${title}`}
      onClick={openApp}
    >
      <p className="tooltip">{title}</p>
      <motion.span
        onTap={handleTap}
        initial={false}
        animate={animateObj}
        transition={{ type: "spring", duration: 0.7 }}
        transformTemplate={({ translateY }) => `translateY(${translateY})`}
      >
        <motion.img
          ref={imgRef}
          src={`/assets/app-icons/${appID}/256.webp`}
          draggable={false}
          style={{ width, willChange: "width" }}
          alt={`${title} app icon`}
        />
      </motion.span>
      <div
        className="dot"
        style={{ "--opacity": +isOpen } as React.CSSProperties}
      />
    </button>
  );
};

const baseWidth = 57.6;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.414,
  baseWidth * 2,
  baseWidth * 1.414,
  baseWidth * 1.1,
  baseWidth,
];

const useDockHoverAnimation = (
  mouseX: MotionValue<number | null>,
  ref: RefObject<HTMLImageElement>
) => {
  const distance = useMotionValue(beyondTheDistanceLimit);

  const widthPX: MotionValue<number> = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1300,
      damping: 82,
    }
  );

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width };
};
